// async () {
//     try {
//         
//     }  catch(e) {
//         console.log(e)
//     }
// }

const db = require('../db.js')

class UserModel {
    async getGradeGames(id) {
        if (id) {
            return (await db.query(`SELECT game, ROUND(AVG(grade), 2) as grade FROM relations WHERE game = $1 GROUP BY game`, [id])).rows
        }
        return (await db.query(`SELECT game, ROUND(AVG(grade), 2) as grade FROM relations GROUP BY game`)).rows
    }
    async getById(appid) {
        return (await db.query(`SELECT * FROM games WHERE steam_id = $1`, [appid])).rows[0]
    }
    async getByCategory(param, category, table, secondParam) {
        let result;
        if (secondParam) {
            const [key, value] = secondParam
            const add = key && value ? `AND ${key} = ${value}` : ''
            result = await db.query(`SELECT * FROM ${table} WHERE ${category} = $1 ${add} ORDER BY id DESC` + ``, [param])
        }
        else {
            result = await db.query(`SELECT * FROM ${table} WHERE ${category} = $1 ORDER BY id DESC` + ``, [param])
        }
        const total = result.rows.map(({password, ...rest}) => rest)
        return total
    }
    // async getRelation(user_id, game) {
    //     if (game) {
    //         return await db.query(`SELECT * FROM relations WHERE user_id = $1 AND game = $2 ORDER BY id DESC` + ``, [user_id, game])
    //     }
    //     return await db.query(`SELECT * FROM relations WHERE user_id = $1 ORDER BY id DESC` + ``, [user_id])
    // }
    async getWithNick(game) {
        return await db.query(`SELECT comments.id, game, text, nickname, user_id, avatar, comments.created_at FROM comments JOIN users ON comments.user_id = users.id WHERE game = ${game} ORDER BY id DESC`)
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
}

module.exports = new UserModel()