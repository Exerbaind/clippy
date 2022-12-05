const { contextBridge } = require('electron')
const {readFile, writeFile} = require('fs/promises');
const path = require('path');

contextBridge.exposeInMainWorld('store', {
    getStore: () => readFile(path.join(__dirname, './store.json')).then(JSON.parse),
    setStore: (value) => writeFile(path.join(__dirname, './store.json'), JSON.stringify(value)),
})