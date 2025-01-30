const Model = require('./model.js')

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
            await Model.post(data, 'users')
        } catch(e) {
            console.log(e)
        }
    }
    async update({ id }, data) {
        try {
            await Model.update(id, data, 'users')
        } catch(e) {
            console.log(e)
        }
    }   
    async delete({ id }) {
        try {
            await Model.delete(id, 'users')
        } catch(e) {
            console.log(e)
        }
    }
    async login(mail, password) {
        try {
            await Model.login(mail, password)
        }  catch(e) {
            console.log(e)
        }
    }
    async registration(data) {
        try {
            const {nickname, mail, password} = data
            const func = await Model.registration(nickname, mail, password)
            console.log(func)
        }  catch(e) {
            console.log(e)
        }
    }
}

module.exports = new UserService()