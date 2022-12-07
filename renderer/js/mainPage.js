const clipboardContainer = document.querySelector('.container');
let currentRenderedData = null;
let activeClipboardID = null;

function handleActive(id) {
    if (activeClipboardID) {
        const currentActiveClipboard = document.getElementById(activeClipboardID);
        currentActiveClipboard.classList.remove('clipboard_active');
    }

    const activeClipboard = document.getElementById(id);
    activeClipboard.classList.add('clipboard_active');

    activeClipboardID = id;
}

async function handleClick(item) {
    const { id, data } = item;

    if (activeClipboardID !== id) return handleActive(id);

    await navigator.clipboard.writeText(data);
    await store.updateStore(item);
}

function renderClipboard(item) {
    const { id, data } = item;

    const clipboard = document.createElement('div');
    clipboard.classList.add('clipboard');
    clipboard.id = id;

    const clipboardType = document.createElement('div');
    clipboardType.classList.add('clipboard-type-container');
    clipboardType.style.backgroundColor = '#1565c0';

    const clipboardTypeText = document.createElement('p');
    clipboardTypeText.classList.add('clipboard-type-text');
    clipboardTypeText.innerText = 'Текст';

    const clipboardContent = document.createElement('div');
    clipboardContent.classList.add('clipboard-content');

    const clipboardContentData = document.createElement('p');
    clipboardContentData.classList.add('clipboard-content-data');
    clipboardContentData.innerText = data;

    clipboardType.appendChild(clipboardTypeText);
    clipboard.appendChild(clipboardType);

    clipboardContent.appendChild(clipboardContentData);
    clipboard.appendChild(clipboardContent);

    clipboardContainer.appendChild(clipboard);

    clipboard.addEventListener('click', async () => handleClick(item));
}

async function main() {
    try {
        const data = await store.getStore();
        const isDataChanged = JSON.stringify(data) !== JSON.stringify(currentRenderedData);
        if (data && Array.isArray(data) && data.length && isDataChanged) {
            currentRenderedData = data;
            clipboardContainer.textContent = '';
            return data.forEach(renderClipboard);
        }
    
        return console.log('there are no data')
    } catch (error) {
        console.error(error);
    }
}

setInterval(main, 100);
