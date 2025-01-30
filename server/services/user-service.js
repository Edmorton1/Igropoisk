const Model = require('./model.js')

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
}

module.exports = new UserService()