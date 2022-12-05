const macMenu = [
    {
      label: 'Clippy',
      submenu: [
        {
            label: 'About'
        }
      ]
    }
]

const commonMenu = [
    {
      role: 'fileMenu'
    }
]

const windowsMenu = [
    {
        label: 'Help',
        submenu: [
            {
                label: 'About'
            }
        ]
    }
]

function createMenuTemplate(isMacOS, isWin)  {
    if (isMacOS) {
        return [...macMenu, ...commonMenu];
    }

    if (isWin) {
        return [...commonMenu, windowsMenu];
    }

    return [...commonMenu]
}

module.exports = createMenuTemplate;