const db = require('../db.js')
const bcrypt = require('bcrypt')

class UserModel {
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
    async getByToken(refreshToken) {
        const userId = refreshToken.id
        const user = await db.query(`SELECT * FROM users WHERE id = $1`, [userId])
        return user.rows[0]
    }
}

module.exports = new UserModel()