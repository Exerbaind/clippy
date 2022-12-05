const macMenu = [
    {
        label: 'Clippy',
        submenu: [
          { role: 'about' },
          { type: 'separator' },
          { role: 'services' },
          { type: 'separator' },
          { role: 'hide' },
          { role: 'hideOthers' },
          { role: 'unhide' },
          { type: 'separator' },
          { role: 'quit' }
        ]
    }
]

const macFileMenu = [
    {
        label: 'File',
        submenu: [
            {
                role: 'close' 
            } 
        ]
    }
]

const commonFileMenu = [
    {
        label: 'File',
        submenu: [
            {
                role: 'quit' 
            } 
        ]
    }
]

function createMenuTemplate(isMacOS)  {
    if (isMacOS) {
        return [...macMenu, ...macFileMenu];
    }

    return [...commonFileMenu]
}

module.exports = createMenuTemplate;