const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

function pushClipboardToStore(clipboard) {
    try {
        const storeDataJSON = fs.readFileSync("store.json", "utf8") || null;
        const clipboardItem = {
            id: uuidv4(),
            data: clipboard,
        }
        if (storeDataJSON) {
            const storeData = JSON.parse(storeDataJSON);
            const newStoreData = [...storeData, clipboardItem];
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