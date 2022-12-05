function main() {
    const data = JSON.parse(localStorage.getItem('CLIPBOARD_APP_DATA'));

    if (Array.isArray(data) && data.length) {
        return console.log('data is here')
    }

    return console.log('there are no data')
}

main();