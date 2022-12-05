async function main() {
    const data = await store.getStore();
    console.log(data);
    if (Array.isArray(data) && data.length) {
        return console.log(data)
    }

    return console.log('there are no data')
}

main();