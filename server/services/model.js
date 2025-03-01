// async () {
//     try {
//         
//     }  catch(e) {
//         console.log(e)
//     }
// }

const db = require('../db.js')
const bcrypt = require('bcrypt')
const multer = require('multer')

class UserModel {
    async get(table) {
        try {
            return await db.query(`SELECT * FROM ${table}`)
        } catch(e) {
            console.log(e)
        }
    }
    async getAllUserInf(user_id, nickname) {
        try {
            return await db.query(`
                SELECT users.id, nickname, mail, avatar, users.created_at, 
                count(DISTINCT comments.id) as comments_count,
                count(DISTINCT relations.id) FILTER (where relations.status = 'passed') as games_passed,
                count(DISTINCT relations.id) FILTER (where grade is null) as grade_count
                FROM users 
                LEFT JOIN comments ON comments.user_id = users.id
                LEFT JOIN relations ON relations.user_id = users.id
                ${user_id ? `WHERE users.id = ${user_id}` : ``}
                ${nickname ? `WHERE nickname = '${nickname}'` : ``}
                GROUP BY users.id ORDER BY id DESC`)
        } catch(e) {
            console.log(e)
        }
    }
    async checkInUsers(value, key) {
        return (await db.query(`SELECT CASE WHEN EXISTS (SELECT 1 FROM users WHERE ${key} = '${value}') THEN TRUE ELSE FALSE END AS result`)).rows[0].result
    }
    async getGamesFastNoReleaseDate() {
        try {
            return await db.query(`select * from games WHERE release_date != 'Скоро выйдет' ORDER BY steam_id`)
        } catch(e) {
            console.log(e)
        }
    }
    async getGradeGames(id) {
        if (id) {
            return (await db.query(`SELECT game, ROUND(AVG(grade), 2) as grade FROM relations WHERE game = $1 GROUP BY game`, [id])).rows
        }
        return (await db.query(`SELECT game, ROUND(AVG(grade), 2) as grade FROM relations GROUP BY game`)).rows
    }
    async getSearch(query) {
        return (await db.query(`SELECT * FROM games WHERE LOWER(name) LIKE LOWER('%${query}%') ORDER BY NAME LIKE '${query}%' DESC, total_reviews DESC`)).rows
    }
    async getById(appid) {
        return (await db.query(`SELECT * FROM games WHERE steam_id = $1`, [appid])).rows[0]
    }
    async getFilter(query) {
        const {genre, developer, publisher, release_date, status} = query
        let {page} = query
        page ? page : page = 1
        page == 0 ? page = 1: page
        let {order} = query
        order ? order : order = 'rating'
        const orderTypes = ['popularity', 'rating', 'release_date']
        orderTypes.includes(order) ? order : order = 'rating'
        order == 'rating' ? order = "total_reviews - total_negative" : order
        order == 'popularity' ? order = "total_reviews" : order
        const perPage = 48
        // console.log(genre, order, developer, publisher, release_date, status)
            const developerSQL = developer ? `AND developers @> ARRAY['${developer}']` : ``
            const publisherSQL = publisher ? `AND publishers @> ARRAY['${publisher}']` : ``
            const release_dateSQL = release_date ? `AND release_date = '${release_date}'` : ``
            const statusSQL = status == 'soon' ? `WHERE release_date = 'Скоро выйдет' OR CAST(release_date AS INT) > 2025` : `WHERE release_date != 'Скоро выйдет' AND CAST(release_date AS INT) <= 2025`
            if (genre) {
                const genreString = genre.split(',')
                const genreSQL = genre ? `AND genres @> ARRAY[${genreString}]` : ``
                const pages = Number((await db.query(`select COUNT(steam_id) from games ${statusSQL} ${genreSQL} ${developerSQL} ${publisherSQL} ${release_dateSQL}`)).rows[0].count) / perPage
                return [(await db.query(`SELECT * FROM games ${statusSQL} ${genreSQL} ${developerSQL} ${publisherSQL} ${release_dateSQL} ORDER BY ${order} DESC LIMIT ${perPage} OFFSET ${(page-1) * perPage}`)).rows, Math.ceil(pages)]
            }
            const pages = Number((await db.query(`select COUNT(steam_id) from games ${statusSQL} ${developerSQL} ${publisherSQL} ${release_dateSQL}`)).rows[0].count) / perPage
            return [(await db.query(`SELECT * FROM games ${statusSQL} ${developerSQL} ${publisherSQL} ${release_dateSQL} ORDER BY ${order} DESC LIMIT ${perPage} OFFSET ${(page-1) * perPage}`)).rows, Math.ceil(pages)]
    }
    async getSteamAppid() {
        const response =  (await db.query(`SELECT * FROM games ORDER BY steam_id`)).rows
        return (response.map(e => (e.steam_id)))
    }
    async getByCategory(param, category, table, secondParam) {
        const [key, value] = secondParam
        const add = key && value ? `AND ${key} = ${value}` : ''
        return await db.query(`SELECT * FROM ${table} WHERE ${category} = $1 ${add} ORDER BY id DESC` + ``, [param])
    }
    // async getRelation(user_id, game) {
    //     if (game) {
    //         return await db.query(`SELECT * FROM relations WHERE user_id = $1 AND game = $2 ORDER BY id DESC` + ``, [user_id, game])
    //     }
    //     return await db.query(`SELECT * FROM relations WHERE user_id = $1 ORDER BY id DESC` + ``, [user_id])
    // }
    async getWithNick(game) {
        return await db.query(`SELECT comments.id, game, text, nickname, avatar, comments.created_at FROM comments JOIN users ON comments.user_id = users.id WHERE game = ${game} ORDER BY id DESC`)
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