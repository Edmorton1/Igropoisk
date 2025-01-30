const UserModel = require('./model.js')

class UserService {
    async get() {
        try {
            const users = await UserModel.get('users')
            return users
        } catch(e) {
            console.log(e)
        }
    }
    async post(data) {
        try {
            await UserModel.post(data, 'users')
        } catch(e) {
            console.log(e)
        }
    }
    async update({ id }, data) {
        try {
            await UserModel.update(id, data, 'users')
        } catch(e) {
            console.log(e)
        }
    }   
    async delete({ id }) {
        try {
            await UserModel.delete(id, 'users')
        } catch(e) {
            console.log(e)
        }
    }
}

module.exports = new UserService()