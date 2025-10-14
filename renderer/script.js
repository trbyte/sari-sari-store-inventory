// js for index.html

// script.js

const form = document.getElementById('add-product-form');
const productList = document.getElementById('product-list');

// Load existing products when the app starts
async function loadProducts() {
  const products = await window.api.list();
  renderProducts(products);
}

// Render products in the UI
function renderProducts(products) {
  productList.innerHTML = '';

  products.forEach(p => {
    const item = document.createElement('div');
    item.classList.add('product-item');
    item.innerHTML = `
      <strong>${p.name}</strong> - ₱${p.price} (${p.quantity})
      <button data-id="${p.id}" class="delete-btn">Delete</button>
    `;
    productList.appendChild(item);
  });
}

// Handle add product form
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const newProduct = {
    name: document.getElementById('product-name').value,
    price: parseFloat(document.getElementById('product-price').value),
    quantity: parseInt(document.getElementById('product-quantity').value),
  };

  await window.api.add(newProduct);
  form.reset();
  loadProducts();
});

// Handle delete button clicks
productList.addEventListener('click', async (e) => {
  if (e.target.classList.contains('delete-btn')) {
    const id = e.target.getAttribute('data-id');
    await window.api.remove(id);
    loadProducts();
  }
});

// Initialize app
loadProducts();
