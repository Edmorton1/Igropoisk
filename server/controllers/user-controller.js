// async () {
//     try {
//         
//     }  catch(e) {
//         console.log(e)
//     }
// }
const tokenService = require('../services/token-service.js')
const UserService = require('../services/user-service.js')
const cookie = require('cookie')

class UserController {
    async get(req, res) {
        try {
            const users = await UserService.get()
            res.json(users.rows)
        } catch(e) {
            console.log(e)
        }
    }
    async post(req, res) {
        try {
            const zapros = await UserService.post(req.body)
            res.json(zapros)
        } catch(e) {
            console.log(e)
        }
    }
    async update(req, res) {
        try {
            const zapros = await UserService.update(req.params, req.body)
            res.json(zapros)
        } catch(e) {
            console.log(e)
        }
    }
    async delete(req, res) {
        try {
            const zapros = await UserService.delete(req.params)
            res.json(zapros)
        } catch(e) {
            console.log(e)
        }
    }
    async login(req, res) {
        try {
            const {mail, password} = req.body
            const userTokens =  await UserService.login(mail, password)
            res.cookie("refreshToken", userTokens[1].refreshToken, {httpOnly: true, MaxAge: 24 * 60 * 60 * 1000}) // ТУТ ЕЩЁ НАДО БУДЕТ ПОСТАВИТЬ secure И maxAge
            res.json(userTokens)
        } catch(e) {
            console.log(e)
        }
    }
    async logout(req, res) {
        try {
            await UserService.logout(req.cookies)
            res.clearCookie('refreshToken')
            res.json()
        }  catch(e) {
            console.log(e)
        }
    }
    async registration(req, res) {
        try {
            const data = req.body
            const {nickname, mail, password} = data
            const userTokens = await UserService.registration(nickname, mail, password)
            console.log(userTokens)
            await res.cookie("refreshToken", userTokens[1].refreshToken, {httpOnly: true, MaxAge: 24 * 60 * 60 * 1000}) // ТУТ ЕЩЁ НАДО БУДЕТ ПОСТАВИТЬ secure И maxAge
            res.json(userTokens)
        }  catch(e) {
            console.log(e)
        }
    }
    async refresh(req, res) {
        try {
            const {accessToken} = req.body
            const {refreshToken} = await req.cookies

            const verifyAccessToken = await tokenService.verifyAccessToken(accessToken)
            const verifyRefreshToken = await tokenService.verifyRefreshToken(refreshToken)
            
            if (verifyAccessToken && !verifyRefreshToken) {
                console.log('ассесс')
                const user = await UserService.getByToken(verifyAccessToken)
                const tokens = {accessToken: accessToken}
                return res.json([user, tokens])
            }
            const user = await UserService.getByToken(verifyRefreshToken)

            if (!user) {
                return res.json()
            }
            const tokens = await UserService.refresh(refreshToken, {"id": user.id, "nickname": user.nickname})
            res.json([user, tokens])
        } catch(e) {
            console.log(e)
        }
    }
}

module.exports = new UserController()