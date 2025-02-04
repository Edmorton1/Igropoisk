const Model = require('./model.js')

class UserService {
    async get() {
        try {
            const comment = await Model.get('comments')
            return comment
        } catch(e) {
            console.log(e)
        }
    }
    async getByGame(game) {
        try {
            return await Model.getWithNick(game)
        } catch(e) {
            console.log(e)
        }
    }
    async post(data) {
        try {
            return await Model.post(data, 'comments')
        } catch(e) {
            console.log(e)
        }
    }
    async update({ id }, data) {
        try {
            return await Model.update(id, data, 'comments')
        } catch(e) {
            console.log(e)
        }
    }   
    async delete({ id }) {
        try {
            return await Model.delete(id, 'comments')
        } catch(e) {
            console.log(e)
        }
    }
}

module.exports = new UserService()