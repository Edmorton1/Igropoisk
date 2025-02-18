const Model = require('./model.js')

class RelationService {
    async get() {
        try {
            const relation = await Model.get('relations')
            return relation
        } catch(e) {
            console.log(e)
        }
    }
    async getByUser(user_id) {
        try {
            return await Model.getByCategory(user_id, 'user_id', 'relations')
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
            const get = ((await Model.get('relations')).rows).filter(e => (e.game == game && e.user_id == user_id))[0]
            if (get != undefined) {
                return await Model.update(get.id, data, 'relations')
            }
            return await Model.post(data, 'relations')
        } catch(e) {
            console.log(e)
        }
    }
    async update({ id }, data) {
        try {
            return await Model.update(id, data, 'relations')
        } catch(e) {
            console.log(e)
        }
    }   
    async delete({ id }) {
        try {
            return await Model.delete(id, 'relations')
        } catch(e) {
            console.log(e)
        }
    }
}

module.exports = new RelationService()