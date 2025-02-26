// async () {
//     try {
//         
//     }  catch(e) {
//         console.log(e)
//     }
// }
const tokenService = require('../services/token-service.js')
const UserService = require('../services/user-service.js')
const Model = require('../services/model.js')
const cookie = require('cookie')

class UserController {
    async get(req, res) {
        try {
            const users = await UserService.get(req.query.user_id, req.query.nickname)
            res.json(users.rows)
        } catch(e) {
            console.log(e)
        }
    }
    async getByNickname(req, res) {
        try {
            const {nickname} = req.params
            const user = await UserService.getByNickname(nickname)
            res.json(user.rows)
        } catch(e) {
            console.log(e)
        }
    }
    async checkInUsers(req, res) {
        try {
            const key = Object.keys(req.query)[0]
            const value = req.query[key]
            if (await Model.checkInUsers(value, key) == true) {
                return res.json(`${key} занят`)
            }
            res.json('Свободно')
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
    async uploadAvatar(req, res) {
        const response = await UserService.uploadAvatar(req.file)
        res.json(response)
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
            await res.cookie("refreshToken", userTokens[1].refreshToken, {httpOnly: true, MaxAge: 24 * 60 * 60 * 1000, secure: true}) // ТУТ ЕЩЁ НАДО БУДЕТ ПОСТАВИТЬ secure И maxAge
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
    async refreshAccess(req, res) {

        const {refreshToken} = await req.cookies

        const verifyRefreshToken = await tokenService.verifyRefreshToken(refreshToken)
        const user = await UserService.getByToken(verifyRefreshToken)

        if (verifyRefreshToken) {
            const {accessToken} = await tokenService.generateTokens({"id": user.id, "nickname": user.nickname})
            return res.json(accessToken)
        }
    }
}

module.exports = new UserController()