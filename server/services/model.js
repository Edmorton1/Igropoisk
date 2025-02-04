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
            return await db.query(`SELECT * FROM ${table} ORDER BY id DESC`)
        } catch(e) {
            console.log(e)
        }
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