async function main() {
    const data = await store.getStore();
    if (Array.isArray(data) && data.length) {
        return console.log(data)
    }

    return console.log('there are no data')
}

main();