const Model = require("../services/model");
const fs = require('fs')
const path = require('path')

const filePath = path.join(__dirname, 'slice.txt')

class steamController {
    async getAll(req, res) {
        const appids = await Model.get('appids')
        const clean = appids.rows.map(e => (e.appid))
        res.json(clean)
    }
    async game(req, res) {
        const {id} = req.params
        const response = await fetch(`https://store.steampowered.com/api/appdetails?appids=${id}&l=russian`);
        const data = await response.json();
        res.send(data)
    }
    static async pushTo(list, spice, modificator) {
        const gameClean = await Promise.all(list.slice(spice, spice + modificator).map(async (id) => {
            const gameResponse = await fetch(`https://store.steampowered.com/api/appdetails?appids=${id}&l=russian`);
            const gameData = await gameResponse.json();
            // let gameData;
            // try {
            //     gameData = await gameResponse.json();
            // } catch (error) {
            //     console.error(`Ошибка парсинга JSON для ID ${id}:`, error);
            //     return null;
            // }
            // ПРОВЕРКА НА ТИП
            // try {
            //     console.log(gameData[`${id}`].data.type, id)
            // } catch {
            //     console.log(null, id)
            // }
            if (gameData && gameData[`${id}`].success && gameData[`${id}`].data.type == "game" ? gameData : null) {
                try {
                    const revResponse = await fetch(`https://store.steampowered.com/appreviews/${id}?json=1&language=all`)
                    const reviews = await revResponse.json()
                    const game = gameData[`${id}`].data
                    const release_date = Number(game.release_date.date.slice(-7, -3)) ? game.release_date.date.slice(-7, -3) : "Скоро выйдет"
                    return {
                        steam_id: id,
                        name: game.name,
                        genres: game.genres ? game.genres.map(e => (Number(e.id))) : [],
                        release_date: release_date,
                        developers: game.developers,
                        publishers: game.publishers,
                        total_reviews: reviews['query_summary']['total_reviews'],
                        total_negative: reviews['query_summary']['total_negative']
                    };
                } catch(err) {
                    console.log(id);
                    console.log(err)
                }
            }
            return null
        }))
        const validateData = await (await Promise.all(gameClean)).filter(e => e != null)
        // console.log(validateData)
        await Model.postArray(validateData, 'games')
    }

    static async allGamesAPI() {
        const response = await fetch(`https://api.steampowered.com/ISteamApps/GetAppList/v2`);
        const data = await response.json();
        const appids = data.applist.apps
        .filter(e => e.name != '')
        .map(e => {
            delete e.name
            return e.appid
        })
        console.log('МАП ЗАКОНЧЕН')
        return appids.sort((a, b) => a - b)
    }
    static async pushToDB() {
        try {
            let slice = Number(fs.readFileSync(filePath, 'utf-8'))
            const modificator = 25
            const response = await fetch(`http://localhost:3000/api/appids`)
            const games = await response.json()
            console.log(`СЛАЙС ДО ПЕРВОГО ВЫЗОВА ${slice} / ${games.length}`)
            await steamController.pushTo(games, slice, modificator)
            slice = slice + modificator
            console.log(`СЛАЙС ПОСЛЕ ПЕРВОГО ВЫЗОВА ${slice} / ${games.length}`)
            setInterval(() => {steamController.pushTo(games, slice, modificator); slice += modificator; console.log(`СЛАЙС В ИНТЕРВАЛЕ ${slice} / ${games.length}`); fs.writeFileSync(filePath, (slice - 30).toString());}, 8000)
        } catch(error) {
            console.log(error)
            console.log('ОШИБКА STEAM API')
            console.log('ПЕРЕЗАПУСК pushToDB ЧЕРЕЗ 5 МИНУТ')
            setTimeout(() => steamController.pushToDB(), 300000)
        }
    }
    static async updateTo(list, spice, modificator) {
        try {
            const gameClean = await Promise.all(list.slice(spice, spice + modificator).map(async (id) => {
                try {
                    const gameResponse = await fetch(`https://store.steampowered.com/api/appdetails?appids=${id}&l=russian`);
                    const gameData = await gameResponse.json();
                    const game = gameData[`${id}`].data
                    return {
                        steam_id: id,
                        capsule_image: game.capsule_image,
                        header_image: game.header_image
                    };
                } catch(err) {
                    throw new Error(`XXXXXXXX__ID__XXXXXXXXXXX ЕБУЧИЙ API ВЫДАЛ НУЛ НА ${id} ${err}`)
                }
        }))
        const validateData = await (await Promise.all(gameClean)).filter(e => e != null)
        console.log(`validateData УСПЕШНО ${validateData.length}`)
        await Model.updateArray(validateData)
        } catch(e) {
            throw new Error('СУПЕР АХУЕТЬ ОШИБКА В VALIDATE DATA')
        }
    }
    static async updateToDB() {
        let interval;
        try {
            let slice = Number(fs.readFileSync(filePath, 'utf-8'))
            const modificator = 25
            const response = await fetch(`http://localhost:3000/api/appids`)
            const games = await response.json()
            console.log(`СЛАЙС ДО ПЕРВОГО ВЫЗОВА ${slice} / ${games.length}`)
            await steamController.updateTo(games, slice, modificator)
            slice = slice + modificator
            console.log(`СЛАЙС ПОСЛЕ ПЕРВОГО ВЫЗОВА ${slice} / ${games.length}`)
            interval = setInterval(async () => {
                try {
                    await steamController.updateTo(games, slice, modificator); slice += modificator; console.log(`СЛАЙС В ИНТЕРВАЛЕ ${slice} / ${games.length}`); fs.writeFileSync(filePath, (slice - 30).toString());
                } catch(e) {
                    console.log(e)
                    console.log('ОШИБКА STEAM API НА UPDATETODB NIZHNY UROVEN')
                    if (interval) clearInterval(interval)
                    setTimeout(() => steamController.updateToDB(), 120000)
                }}, 8000)
        } catch(error) {
            console.log(error)
            console.log('ОШИБКА STEAM API НА UPDATETDB ВЕРХНИЙ УРОВЕНЬ')
            if (interval) clearInterval(interval);
            setTimeout(() => steamController.updateToDB(), 120000)
        }
    }
    async WrapperPush() {
        try {
            await steamController.updateToDB();
        } catch {
            console.log('ПЕРЕЗАПУСК ЧЕРЕЗ 2 МИНУТ')
            setTimeout(() => {steamController.updateToDB(), 120000})
        }
    }
    
    async appids(req, res) {
        const games = await Model.getSteamAppid()
        console.log(games)
        res.json(games)
    }
    async getEverything(req, res) {
        const games = (await Model.getGamesFastNoReleaseDate('games')).rows
        res.json(games)
    }






    // async getHun(req, res) {
    //     const body = req.body
    //     await Model.postEasy(body)
    //     await res.json(body)
    // }
    // async deleteAll(req, res) {
    //     await Model.deleteEasy('games')
    //     await res.json('Все игры стёрты')
    // }
    async getByRating(req, res) {
        const response = await fetch(`http://localhost:3000/api/allGamesAPI`)
        const games = await response.json()
        games.slice(0, 10).forEach(e => console.log(e))
    }
}

module.exports = new steamController