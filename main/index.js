const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const db = require('./db');

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, '../preload/preload.js')
    }
  });

  win.loadFile(path.join(__dirname, '../renderer/index.html'));
}

app.whenReady().then(() => {
  createWindow();
});

ipcMain.handle('inventory:list', () => db.getAll());
ipcMain.handle('inventory:get', (event, id) => db.getById(id));
ipcMain.handle('inventory:add', (event, product) => db.add(product));
ipcMain.handle('inventory:update', (event, product) => db.update(product));
ipcMain.handle('inventory:delete', (event, id) => db.remove(id));
