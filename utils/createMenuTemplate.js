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

function createMenuTemplate(isMacOS)  {
    if (isMacOS) {
        return [...macMenu, ...commonMenu];
    }

    return [...commonMenu]
}

module.exports = createMenuTemplate;