const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

function pushClipboardToStore(clipboard) {
    try {
        const storeDataJSON = fs.readFileSync("store.json", "utf8") || null;
        const isExistingClipboard = clipboard && clipboard.id;
        let clipboardItem;

        if (isExistingClipboard) {
            clipboardItem = {
                id: clipboard.id,
                data: clipboard.data,
            }
        } else {
            clipboardItem = {
                id: uuidv4(),
                data: clipboard,
            }
        }
      
        if (storeDataJSON) {
            const storeData = JSON.parse(storeDataJSON);
            const newStoreData = [clipboardItem, ...storeData];
            fs.writeFileSync('store.json', JSON.stringify(newStoreData))
        } else {
            const newStoreData = [clipboardItem];
            fs.writeFileSync('store.json', JSON.stringify(newStoreData))
        }
    } catch(error) {
        console.error(error);
    }

}

module.exports = pushClipboardToStore;