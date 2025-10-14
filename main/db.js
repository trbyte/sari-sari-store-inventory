const fs = require('fs')
const path = require('path')
const { app } = require('electron')

function getDataPaths() {
	// Use Electron's userData path for OS-appropriate, per-user storage
	const baseDir = app ? app.getPath('userData') : process.cwd()
	const dataDir = path.join(baseDir, 'data')
	const dbPath = path.join(dataDir, 'inventory.json')
	return { dataDir, dbPath }
}

function ensureDataFile() {
	return new Promise((resolve, reject) => {
		try {
			const { dataDir, dbPath } = getDataPaths()
			if (!fs.existsSync(dataDir)) {
				fs.mkdirSync(dataDir)
			}
			if (!fs.existsSync(dbPath)) {
				fs.writeFileSync(dbPath, JSON.stringify({ products: [] }, null, 2), 'utf8')
			}
			resolve()
		} catch (err) {
			reject(err)
		}
	})
}

function readDb() {
	const { dbPath } = getDataPaths()
	const raw = fs.readFileSync(dbPath, 'utf8')
	return JSON.parse(raw)
}

function writeDb(data) {
	const { dbPath } = getDataPaths()
	fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf8')
}

function generateId() {
	return Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 8)
}

async function readAll() {
	await ensureDataFile()
	const db = readDb()
	return db.products
}

async function getItem(id) {
	await ensureDataFile()
	const db = readDb()
	return db.products.find(p => p.id === id) || null
}

async function addItem(product) {
	await ensureDataFile()
	const db = readDb()
	const newProduct = {
		id: generateId(),
		name: String(product.name || '').trim(),
		price: Number(product.price || 0),
		quantity: Number(product.quantity || 0),
		category: product.category ? String(product.category) : ''
	}
	if (!newProduct.name) {
		throw new Error('Product name is required')
	}
	if (Number.isNaN(newProduct.price) || newProduct.price < 0) {
		throw new Error('Price must be a non-negative number')
	}
	if (!Number.isInteger(newProduct.quantity) || newProduct.quantity < 0) {
		throw new Error('Quantity must be a non-negative integer')
	}
	db.products.push(newProduct)
	writeDb(db)
	return newProduct
}

async function updateItem(product) {
	await ensureDataFile()
	const db = readDb()
	const index = db.products.findIndex(p => p.id === product.id)
	if (index === -1) {
		throw new Error('Product not found')
	}
	const existing = db.products[index]
	const updated = {
		...existing,
		name: product.name !== undefined ? String(product.name).trim() : existing.name,
		price: product.price !== undefined ? Number(product.price) : existing.price,
		quantity: product.quantity !== undefined ? Number(product.quantity) : existing.quantity,
		category: product.category !== undefined ? String(product.category) : existing.category
	}
	if (!updated.name) {
		throw new Error('Product name is required')
	}
	if (Number.isNaN(updated.price) || updated.price < 0) {
		throw new Error('Price must be a non-negative number')
	}
	if (!Number.isInteger(updated.quantity) || updated.quantity < 0) {
		throw new Error('Quantity must be a non-negative integer')
	}
	db.products[index] = updated
	writeDb(db)
	return updated
}

async function deleteItem(id) {
	await ensureDataFile()
	const db = readDb()
	const index = db.products.findIndex(p => p.id === id)
	if (index === -1) {
		throw new Error('Product not found')
	}
	const [removed] = db.products.splice(index, 1)
	writeDb(db)
	return removed
}

module.exports = {
	ensureDataFile,
	readAll,
	getItem,
	addItem,
	updateItem,
	deleteItem
}


