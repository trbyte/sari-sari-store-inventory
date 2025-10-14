const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const { ensureDataFile, readAll, addItem, updateItem, deleteItem, getItem } = require('./db')

let win

function createWindow() {
	win = new BrowserWindow({
		width: 1000,
		height: 700,
		webPreferences: {
			preload: path.join(__dirname, '../preload/preload.js'),
			contextIsolation: true,
			nodeIntegration: false,
			webSecurity: true,
			devTools: true
		}
	})

	if (typeof win.removeMenu === 'function') {
		win.removeMenu();
	}

	win.loadFile(path.join(__dirname, '../renderer/index.html'));

	win.webContents.openDevTools();

}

app.whenReady().then(async () => {
	await ensureDataFile()
	createWindow()

	ipcMain.handle('inventory:list', async () => {
		return await readAll()
	})

	ipcMain.handle('inventory:get', async (_event, id) => {
		return await getItem(id)
	})

	ipcMain.handle('inventory:add', async (_event, product) => {
		return await addItem(product)
	})

	ipcMain.handle('inventory:update', async (_event, product) => {
		return await updateItem(product)
	})

	ipcMain.handle('inventory:delete', async (_event, id) => {
		return await deleteItem(id)
	})
})

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow()
	}
})