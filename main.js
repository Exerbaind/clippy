const path = require('path');
const { app, BrowserWindow, Menu } = require('electron');
const clipboard = require('electron-clipboard-extended')
const createMenuTemplate = require('./utils/createMenuTemplate');
const pushClipboardToStore = require('./utils/storeHandlers/pushClipboardToStore');
const checkClipboardInStore = require('./utils/storeHandlers/checkClipboardInStore');
const updateClipboardInStore = require('./utils/storeHandlers/updateClipboardInStore');

const isMacOS = process.platform === 'darwin';

let mainWindow;

// Создание главного экрана 
function createMainWindow() {
    mainWindow = new BrowserWindow({
        title: 'Clippy', // для правильной отрисовки при открытии 
        width: 100000, // во всю ширину экрана
        height: 300,
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js'),
        },
        frame: false,
        backgroundColor: "#212121",
        x: 0, 
        y: 100000,
    });

    mainWindow.webContents.openDevTools(); // TODO: сделать только для development

    mainWindow.loadFile(path.join(__dirname, './renderer/main.html'));
}


// Рендер приложения, когда загрузится 
app.whenReady().then(() => {
    createMainWindow();

    const menuTemplate = createMenuTemplate(isMacOS);

    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);

    // TODO: пофиксить скрытие и показ приложения, сейчас жопа какая-т 
    // Открытие приложухи по нажатию на сочетание клавиш
    // globalShortcut.register('Shift+Command+V', () => {
        // if (BrowserWindow.getAllWindows().length === 1) {
        //     // app.show();
        //     // app.focus();
        // }
    // });

    // globalShortcut.register('Escape', () => {
    //     console.log(BrowserWindow.getAllWindows().length);
    //     app.hide();
    // });

    // Слежение за изменением буфера обмена при копировании и запись в store приложения
    clipboard.on('text-changed', () => {
        let clipboardData = clipboard.readText();
        const clipboardInStore = checkClipboardInStore(clipboardData);
        if (clipboardInStore) {
            updateClipboardInStore(clipboardInStore);
        } else {
            pushClipboardToStore(clipboardData);
        }
    }).startWatching();

    mainWindow.on('closed', () => mainWindow = null);

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createMainWindow()
    })
});

// Не закрывать полностью приложение по нажатию на крестик
app.on('window-all-closed', () => {
    if (!isMacOS) app.quit()
})

