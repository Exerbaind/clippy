const fs = require('fs');

function updateClipboardInStore(clipboard) {
    try {
        const storeDataJSON = fs.readFileSync("store.json", "utf8") || null;
        const currentClipboard = clipboard;
        
        const storeData = JSON.parse(storeDataJSON);

        const dataWithoutCurrentClipboard = storeData.filter((item) => item.id !== clipboard.id);

        const newStoreData = [currentClipboard, ...dataWithoutCurrentClipboard];

        fs.writeFileSync('store.json', JSON.stringify(newStoreData))
    } catch(error) {
        console.error(error);
    }

}

module.exports = updateClipboardInStore;