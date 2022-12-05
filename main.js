const path = require('path');
const { app, BrowserWindow } = require('electron');

const isMacOS = process.platform === 'darwin';

function createMainWindow() {
    const mainWindow = new BrowserWindow({
        title: 'Clippy', // для правильной отрисовки при открытии 
        width: 800,
        height: 400,
    });

    mainWindow.loadFile(path.join(__dirname, './renderer/index.html'));
}

app.whenReady().then(() => {
    createMainWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createMainWindow()
    })
});

app.on('window-all-closed', () => {
    if (!isMacOS) app.quit()
})

