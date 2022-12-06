const { contextBridge } = require('electron')
const {readFile, writeFile} = require('fs/promises');
const path = require('path');
const pushClipboardToStore = require('./utils/storeHandlers/pushClipboardToStore');

contextBridge.exposeInMainWorld('store', {
    getStore: () => readFile(path.join(__dirname, './store.json')).then(JSON.parse),
    setStore: (item) => pushClipboardToStore(item),
})