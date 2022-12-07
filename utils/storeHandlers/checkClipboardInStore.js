const fs = require('fs');

function checkClipboardInStore(clipboard) {
    const storeDataJSON = fs.readFileSync("store.json", "utf8") || null;

    if (storeDataJSON) {
        const storeData = JSON.parse(storeDataJSON);
        const clipboardInStore = storeData.find((item) => item.data === clipboard);

        if (clipboardInStore) return clipboardInStore;
    }

    return false;
}

module.exports = checkClipboardInStore;