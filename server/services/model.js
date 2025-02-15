// async () {
//     try {
//         
//     }  catch(e) {
//         console.log(e)
//     }
// }

const db = require('../db.js')
const bcrypt = require('bcrypt')

class UserModel {
    async get(table) {
        try {
            return await db.query(`SELECT * FROM ${table}`)
        } catch(e) {
            console.log(e)
        }
    }
    async getGamesFastNoReleaseDate() {
        try {
            return await db.query(`select * from games WHERE release_date != 'Скоро выйдет' ORDER BY steam_id`)
        } catch(e) {
            console.log(e)
        }
    }
    async getFilter(query) {
        const {genre, developer, publisher, release_date, status} = query
        let {order} = query
        order ? order : order = 'rating'
        const orderTypes = ['popularity', 'rating', 'release_date']
        orderTypes.includes(order) ? order : order = 'rating'
        order == 'rating' ? order = "total_reviews - total_negative" : order
        order == 'popularity' ? order = "total_reviews" : order
        // console.log(genre, order, developer, publisher, release_date, status)
        try {
            const developerSQL = developer ? `AND developers @> ARRAY['${developer}']` : ``
            const publisherSQL = publisher ? `AND publishers @> ARRAY['${publisher}']` : ``
            const release_dateSQL = release_date ? `AND release_date = '${release_date}'` : ``
            const statusSQL = status == 'soon' ? `WHERE release_date = 'Скоро выйдет'` : `WHERE release_date !='Скоро выйдет'`
            // console.log(`SELECT * FROM games ${statusSQL} ${developerSQL} ${publisherSQL} ${release_dateSQL} ORDER BY ${order} DESC;`)
            if (genre) {
                const genreString = genre.split(',')
                const genreSQL = genre ? `AND genres @> ARRAY[${genreString}]` : ``
                return (await db.query(`SELECT * FROM games ${statusSQL} ${genreSQL} ${developerSQL} ${publisherSQL} ${release_dateSQL} ORDER BY ${order} DESC;`)).rows
            }
            return (await db.query(`SELECT * FROM games ${statusSQL} ${developerSQL} ${publisherSQL} ${release_dateSQL} ORDER BY ${order} DESC;`)).rows
        } catch(e) {
            console.log('ОШИБКА В ПАРАМЕТРАХ', e)
            return (await db.query(`SELECT * FROM games WHERE release_date !='Скоро выйдет' ORDER BY ${order} DESC;`)).rows
        }
    }
    async getSteamAppid() {
        const response =  (await db.query(`SELECT * FROM games ORDER BY steam_id`)).rows
        return (response.map(e => (e.steam_id)))
    }
    async getByCategory(param, category, table) {
        return await db.query(`SELECT * FROM ${table} WHERE ${category} = $1 ORDER BY id DESC` + ``, [param])
    }
    async getWithNick(game) {
        return await db.query(`SELECT comments.id, game, text, nickname, created_at FROM comments JOIN users ON comments.user_id = users.id WHERE game = ${game} ORDER BY id DESC`)
    }
    async post(data, table) {
        try {
            const keys = Object.keys(data)
            const values = Object.values(data)
            const dollars = values.map((e, i) => (`$${i + 1}`))
            const zapros = await db.query(`INSERT INTO ${table}(${keys}) VALUES(${dollars}) RETURNING *`, values)
            return zapros.rows
        } catch(e) {
            console.log(e)
        }
    }
    async postArray(data, table) {
        try {
            data.forEach(async (e) => {
                const keys = Object.keys(e)
                const values = Object.values(e)
                const dollars = values.map((e, i) => (`$${i + 1}`))
                const zapros = await db.query(`INSERT INTO ${table}(${keys}) VALUES(${dollars}) ON CONFLICT (steam_id) DO NOTHING RETURNING *`, values)
                return zapros.rows
            })
        } catch(e) {
            console.log(e)
        }
    }
    async postEasy(data) {
        try {
            return await db.query(`INSERT INTO appids (appid) SELECT unnest($1::int[]) ON CONFLICT (appid) DO NOTHING RETURNING *`, [data])
        }  catch(e) {
            console.log(e)
        }
    }
    async updateArray(data) {
        try {
            data.forEach(async (e) => {
                const zapros = await db.query(`UPDATE games SET header_image = $1, capsule_image = $2 WHERE steam_id = $3`, [e.header_image, e.capsule_image, e.steam_id])
                return zapros.rows
            })
        } catch(e) {
            console.log(e)
        }
    }
    async deleteEasy(table) {
        try {
            await db.query(`DELETE FROM ${table} RETURNING *`)
        }  catch(e) {
            console.log(e)
        }
    }
    async update(id, data, table) {
        try {
            const keys = Object.keys(data)
            const values = Object.values(data)
            const requeest = keys.map((e, i) => (`${e} = $${i + 1}`)).join(', ')
            const zapros = await db.query(`UPDATE ${table} SET ${requeest} WHERE id = $${keys.length + 1} RETURNING *`, [...values, id])
            return zapros.rows
        } catch(e) {
            console.log(e)
        }
    }
    async delete(key, value, table) {
        try {
            const zapros = await db.query(`DELETE FROM ${table} WHERE ${key} = $1 RETURNING *`, [value])
            return zapros.rows
        } catch(e) {
            console.log(e)
        }
    }
    async getByToken(refreshToken) {
        const userId = refreshToken.id
        const user = await db.query(`SELECT * FROM users WHERE id = $1`, [userId])
        return user.rows[0]
    }
    async login(mail, password) {
        try {
            const zapros = await db.query(`SELECT * FROM users WHERE mail = $1`, [mail])
            if (zapros.rows.length == 0) {
                throw new Error('Такого пользователя не существует')
            }
            const passwordCompare = await bcrypt.compare(password, zapros.rows[0].password)
            if (passwordCompare) {
                return zapros.rows[0]
            }
            throw new Error('Неверная почта или пароль')
        }  catch(e) {
            console.log(e)
        }
    }
    async registration(nickname, mail, password) {
        try {
            const salt = await bcrypt.genSalt(10)
            const passwordHash = await bcrypt.hash(password, salt)
            const user = await db.query(`INSERT INTO users(nickname, mail, password) VALUES($1, $2, $3) RETURNING *`, [nickname, mail, passwordHash])
            return user.rows[0]
        }  catch(e) {
            console.log(e)
        }
    }
}

module.exports = new UserModel()