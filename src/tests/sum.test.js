// const URL_SERVER_API = require('./URLS')

// const sum = require('./sum');

// test('adds 1 + 2 to equal 3', () => {
//   expect(sum(1, 2)).toBe(3);
// });
test('', async () => {
    const url = 'http://localhost:3000/api/'
    const arr = ['users', 'users/123', 'comments', 'comments/570', 'relations', 'relations/75', 'game/570', 'getSearch', 'appids', 'getEverything']
    async function sum() {
        for (let param of arr) {
            const res = await(await fetch(`${url}${param}`)).json()
            console.log(param)
            // return res
        }
        return 'res'
    }

    expect(await sum()).toBeTruthy()
})