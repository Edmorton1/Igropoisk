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
    async post(data) {
        try {
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