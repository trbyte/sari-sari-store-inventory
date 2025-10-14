const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('api', {
	list: () => ipcRenderer.invoke('inventory:list'),
	get: (id) => ipcRenderer.invoke('inventory:get', id),
	add: (product) => ipcRenderer.invoke('inventory:add', product),
	update: (product) => ipcRenderer.invoke('inventory:update', product),
	remove: (id) => ipcRenderer.invoke('inventory:delete', id)
})


