const Model = require('./model.js')
const TokenService = require('./token-service.js')

// async () {
//     try {
//         
//     }  catch(e) {
//         console.log(e)
//     }
// }

class UserService {
    async get() {
        try {
            const users = await Model.get('users')
            return users
        } catch(e) {
            console.log(e)
        }
    }
    async post(data) {
        try {
            return await Model.post(data, 'users')
        } catch(e) {
            console.log(e)
        }
    }
    async update({ id }, data) {
        try {
            return await Model.update(id, data, 'users')
        } catch(e) {
            console.log(e)
        }
    }   
    async delete({ id }) {
        try {
            return await Model.delete('id', id, 'users')
        } catch(e) {
            console.log(e)
        }
    }
    async createSaveTokens(id, nickname) {
        const data = {"id": id, "nickname": nickname}
        const tokens = await TokenService.generateTokens(data)
        console.log(tokens)
        const saveTokens = await TokenService.saveRefreshToken(id, tokens.refreshToken)
        return tokens
    }
    async login(mail, password) {
        try {
            const user = await Model.login(mail, password)
            const tokens = await this.createSaveTokens(user.id, user.nickname)
            return [user, tokens]
        }  catch(e) {
            console.log(e)
        }
    }
    async logout({ refreshToken }) {
        try {
            await Model.delete('token', refreshToken, 'tokens')
            console.log(refreshToken)
        }  catch(e) {
            console.log(e)
        }
    }

    async registration(nickname, mail, password) {
        try {
            const user = await Model.registration(nickname, mail, password)
            const tokens = await this.createSaveTokens(user.id, user.nickname)
            return [user, tokens]
        }  catch(e) {
            console.log(e)
        }
    }
    async getByToken(refreshToken) {
        try {
            return await Model.getByToken(refreshToken)
        } catch(e) {
            console.log(e)
        }
    }
    async refresh(refreshToken, payload) {
        try {
            const tokenVerify = await TokenService.verifyRefreshToken(refreshToken)
            if (tokenVerify == undefined) {
                throw new Error('НЕ АВТОРИЗОВАН')
            }
            return TokenService.generateTokens(payload)
        } catch(e) {
            console.log(e)
        }
    }
}

module.exports = new UserService()