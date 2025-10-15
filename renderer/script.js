// Core state and persistence
const STORAGE_KEY = 'tindahan_products_v1';

function readProducts() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed;
    return [];
  } catch {
    return [];
  }
}

function writeProducts(products) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

// DOM references
const form = document.getElementById('add-product-form');
const nameInput = document.getElementById('product-name');
const priceInput = document.getElementById('product-price');
const quantityInput = document.getElementById('product-quantity');
const tableBody = document.querySelector('#product-table tbody');

const navHome = document.getElementById('nav-home');
const navAdd = document.getElementById('nav-add');
const navDisplay = document.getElementById('nav-display');

const homeSection = document.getElementById('home-section');
const addSection = document.getElementById('add-section');
const displaySection = document.getElementById('display-section');

// Rendering
function renderTable() {
  const products = readProducts();
  tableBody.innerHTML = '';

  if (!products.length) {
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    td.colSpan = 4;
    td.textContent = 'No products yet. Add your first item!';
    tr.appendChild(td);
    tableBody.appendChild(tr);
    return;
  }

  products.forEach(p => {
    const tr = document.createElement('tr');

    const nameTd = document.createElement('td');
    nameTd.textContent = p.name;

    const priceTd = document.createElement('td');
    priceTd.textContent = `₱${Number(p.price).toFixed(2)}`;

    const qtyTd = document.createElement('td');
    qtyTd.textContent = String(p.quantity);

    const actionTd = document.createElement('td');
    const delBtn = document.createElement('button');
    delBtn.className = 'delete-btn';
    delBtn.setAttribute('data-id', p.id);
    delBtn.textContent = 'Delete';
    actionTd.appendChild(delBtn);

    tr.appendChild(nameTd);
    tr.appendChild(priceTd);
    tr.appendChild(qtyTd);
    tr.appendChild(actionTd);
    tableBody.appendChild(tr);
  });
}

// Navigation
function setActiveNav(activeLink) {
  [navHome, navAdd, navDisplay].forEach(link => {
    if (!link) return;
    if (link === activeLink) link.classList.add('active');
    else link.classList.remove('active');
  });
}

function showSection(section) {
  [homeSection, addSection, displaySection].forEach(sec => {
    if (!sec) return;
    if (sec === section) {
      sec.classList.add('active');
      sec.classList.remove('hidden');
    } else {
      sec.classList.remove('active');
      sec.classList.add('hidden');
    }
  });
}

if (navHome) {
  navHome.addEventListener('click', (e) => {
    e.preventDefault();
    setActiveNav(navHome);
    showSection(homeSection);
  });
}

if (navAdd) {
  navAdd.addEventListener('click', (e) => {
    e.preventDefault();
    setActiveNav(navAdd);
    showSection(addSection);
    nameInput.focus();
  });
}

if (navDisplay) {
  navDisplay.addEventListener('click', (e) => {
    e.preventDefault();
    setActiveNav(navDisplay);
    showSection(displaySection);
    renderTable();
  });
}

// Add product
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = nameInput.value.trim();
    const price = Number(priceInput.value);
    const quantity = Number.parseInt(quantityInput.value, 10);

    if (!name) {
      alert('Please enter a product name.');
      return;
    }
    if (!Number.isFinite(price) || price <= 0) {
      alert('Please enter a valid price greater than 0.');
      return;
    }
    if (!Number.isInteger(quantity) || quantity < 0) {
      alert('Please enter a valid quantity (0 or more).');
      return;
    }

    const products = readProducts();
    const newProduct = { id: generateId(), name, price, quantity };
    products.push(newProduct);
    writeProducts(products);

    form.reset();
    nameInput.focus();
    renderTable();
    setActiveNav(navDisplay);
    showSection(displaySection);
  });
}

// Delete product (event delegation on table body)
if (tableBody) {
  tableBody.addEventListener('click', (e) => {
    const target = e.target;
    if (target && target.classList.contains('delete-btn')) {
      const id = target.getAttribute('data-id');
      const products = readProducts();
      const next = products.filter(p => String(p.id) !== String(id));
      writeProducts(next);
      renderTable();
    }
  });
}

// Initial boot
renderTable();
