const Model = require('../models/model.js')
const CrudModel = require('../models/crud-model.js')

class RelationService {
    async get() {
        try {
            const relation = await CrudModel.get('relations')
            return relation
        } catch(e) {
            console.log(e)
        }
    }
    async getByUser(user_id, game) {
        try {
            const game_obj = ['game', game]
            return await Model.getByCategory(user_id, 'user_id', 'relations', game_obj)
        } catch(e) {
            console.log(e)
        }
    }
    async getGradeGames(id) {
        return await Model.getGradeGames(id)
    }
    async post(data) {
        try {
            const {game, status, user_id} = data
            const get = ((await CrudModel.get('relations')).rows).filter(e => (e.game == game && e.user_id == user_id))[0]
            if (get != undefined) {
                return await CrudModel.update(get.id, data, 'relations')
            }
            return await CrudModel.post(data, 'relations')
        } catch(e) {
            console.log(e)
        }
    }
    async update({ id }, data) {
        try {
            return await CrudModel.update(id, data, 'relations')
        } catch(e) {
            console.log(e)
        }
    }   
    async delete({ id }) {
        try {
            return await CrudModel.delete(id, 'relations')
        } catch(e) {
            console.log(e)
        }
    }
}

module.exports = new RelationService()