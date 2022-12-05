const path = require('path');
const { app, BrowserWindow, Menu, globalShortcut } = require('electron');
const clipboard = require('electron-clipboard-extended')
const createMenuTemplate = require('./utils/createMenuTemplate');
const pushClipboardToStore = require('./utils/storeHandlers/pushClipboardToStore');

const isMacOS = process.platform === 'darwin';

// Создание главного экрана 
function createMainWindow() {
    const mainWindow = new BrowserWindow({
        title: 'Clippy', // для правильной отрисовки при открытии 
        width: 100000, // во всю ширину экрана
        height: 400,
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js'),
        },
    });

    mainWindow.webContents.openDevTools(); // TODO: сделать только для development

    mainWindow.loadFile(path.join(__dirname, './renderer/index.html'));
}


// Рендер приложения, когда загрузится 
app.whenReady().then(() => {
    createMainWindow();

    const menuTemplate = createMenuTemplate(isMacOS);

    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);

    // Открытие приложухи по нажатию на сочетание клавиш
    globalShortcut.register('Shift+Command+V', createMainWindow);

    // Слежение за изменением буфера обмена при копировании и запись в store приложения
    clipboard.on('text-changed', () => {
        let clipboardData = clipboard.readText();
        pushClipboardToStore(clipboardData);
    }).startWatching();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createMainWindow()
    })
});

// Не закрывать полностью приложение по нажатию на крестик
app.on('window-all-closed', () => {
    if (!isMacOS) app.quit()
})

