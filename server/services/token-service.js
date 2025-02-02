// async () {
//     try {
//         
//     }  catch(e) {
//         console.log(e)
//     }
// }

const jwt = require('jsonwebtoken')
const db = require('../db.js')

class TokenService {
    async generateTokens(payload) {
        try {
            const accessToken = jwt.sign(payload, process.env.ACCESS_PRIVAT_KEY, {expiresIn: '15m'})
            const refreshToken = jwt.sign(payload, process.env.REFRESH_PRIVAT_KEY, {expiresIn: '10d'})
            return {
                accessToken: accessToken,
                refreshToken: refreshToken
            }
        }  catch(e) {
            console.log(e)
        }
    }
    async verifyRefreshToken(refreshToken) {
        try {
            const verifyRefreshToken = await jwt.verify(refreshToken, process.env.REFRESH_PRIVAT_KEY)
            return verifyRefreshToken
        } catch(e) {
            console.log(new Error('REFRESHTOKEN ПРОСРОЧИЛСЯ ИЛИ НЕВАЛИДЕН', e))
        }
    }
    async verifyAccessToken(accessToken) {
        try {
            const verifyAccessToken = await jwt.verify(accessToken, process.env.ACCESS_PRIVAT_KEY)
            return verifyAccessToken
        } catch(e) {
            console.log(new Error('ACCESSTOKEN ПРОСРОЧИЛСЯ ИЛИ НЕВАЛИДЕН', e))
        }
    }
    async saveRefreshToken(user_id, refreshToken) {
        try {
            const tokenData = await db.query(`SELECT * FROM tokens WHERE user_id = $1`, [user_id])
            if (tokenData.rows.length != 0) {
                const updateToken = await db.query(`UPDATE tokens SET token = $2 WHERE user_id = $1 RETURNING *`, [user_id, refreshToken])
                return updateToken.rows
            }
            const newToken = await db.query(`INSERT INTO tokens(user_id, token) VALUES($1, $2) RETURNING *`, [user_id, refreshToken])
            return newToken.rows
        }  catch(e) {
            console.log(e)
        }
    }
}

module.exports = new TokenService()