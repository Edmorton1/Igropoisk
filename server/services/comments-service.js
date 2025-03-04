const Model = require('../models/model.js')
const CrudModel = require('../models/crud-model.js')

class UserService {
    async get() {
        try {
            const comment = await CrudModel.get('comments')
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
            return await CrudModel.post(data, 'comments')
        } catch(e) {
            console.log(e)
        }
    }
    async update({ id }, data) {
        try {
            return await CrudModel.update(id, data, 'comments')
        } catch(e) {
            console.log(e)
        }
    }   
    async delete({ id }) {
        try {
            console.log(id)
            return await CrudModel.delete('id', id, 'comments')
        } catch(e) {
            console.log(e)
        }
    }
}

module.exports = new UserService()