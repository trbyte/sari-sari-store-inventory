// main/db.js
const fs = require('fs');
const path = require('path');

// Point to the data folder INSIDE your project
const dataPath = path.join(__dirname, '..', 'data', 'products.json');

// Ensure the file exists
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, '[]');
}

// Read all products
function getAll() {
  const data = fs.readFileSync(dataPath, 'utf-8');
  return JSON.parse(data);
}

// Add new product
function add(product) {
  const products = getAll();
  product.id = Date.now(); // simple unique ID
  products.push(product);
  fs.writeFileSync(dataPath, JSON.stringify(products, null, 2));
  return products;
}

// Remove product by ID
function remove(id) {
  let products = getAll();
  products = products.filter(p => p.id !== id);
  fs.writeFileSync(dataPath, JSON.stringify(products, null, 2));
  return products;
}

// Update existing product
function update(updatedProduct) {
  let products = getAll();
  products = products.map(p => (p.id === updatedProduct.id ? updatedProduct : p));
  fs.writeFileSync(dataPath, JSON.stringify(products, null, 2));
  return products;
}

// Get one product
function getById(id) {
  const products = getAll();
  return products.find(p => p.id === id);
}

module.exports = { getAll, add, remove, update, getById };
