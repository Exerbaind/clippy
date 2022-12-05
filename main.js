const path = require('path');
const { app, BrowserWindow, Menu } = require('electron');
const { clipboard } = require('electron');
const createMenuTemplate = require('./utils/createMenuTemplate');

const isMacOS = process.platform === 'darwin';


// Создание главного экрана 
function createMainWindow() {
    const mainWindow = new BrowserWindow({
        title: 'Clippy', // для правильной отрисовки при открытии 
        width: 100000, // во всю ширину экрана
        height: 400,
    });

    mainWindow.webContents.openDevTools(); // TODO: сделать только для development

    // const text = clipboard.readText();
    // console.log(text);

    mainWindow.loadFile(path.join(__dirname, './renderer/index.html'));
}

// Рендер приложения, когда загрузится 
app.whenReady().then(() => {
    createMainWindow();

    const menuTemplate = createMenuTemplate(isMacOS);

    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createMainWindow()
    })
});

// Не закрывать полностью приложение по нажатию на крестик
app.on('window-all-closed', () => {
    if (!isMacOS) app.quit()
})

