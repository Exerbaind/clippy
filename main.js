const path = require('path');
const { app, BrowserWindow, Menu, globalShortcut } = require('electron');
const clipboard = require('electron-clipboard-extended')
const createMenuTemplate = require('./utils/createMenuTemplate');
const Store = require('electron-store');

const isMacOS = process.platform === 'darwin';

// Создание главного экрана 
function createMainWindow() {
    const mainWindow = new BrowserWindow({
        title: 'Clippy', // для правильной отрисовки при открытии 
        width: 100000, // во всю ширину экрана
        height: 400,
    });

    mainWindow.webContents.openDevTools(); // TODO: сделать только для development

    mainWindow.loadFile(path.join(__dirname, './renderer/index.html'));
}


// Рендер приложения, когда загрузится 
app.whenReady().then(() => {
    createMainWindow();
    const store = new Store();

    const menuTemplate = createMenuTemplate(isMacOS);

    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);

    // Открытие приложухи по нажатию на сочетание клавиш
    globalShortcut.register('Shift+Command+V', () => {
        createMainWindow()
        store.set('b', 'hello');
    });

    // Слежение за изменением буфера обмена при копировании
    clipboard.on('text-changed', () => {
        let clipboardData = clipboard.readText()
        console.log(clipboardData);
        store.delete('b');
        console.log(store.get('b'));
    }).startWatching();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createMainWindow()
    })
});

// Не закрывать полностью приложение по нажатию на крестик
app.on('window-all-closed', () => {
    if (!isMacOS) app.quit()
})

