const RelationService = require('../services/relations-service.js')

class RelationsController {
    async get(req, res) {
        try {
            const relation = await RelationService.get()
            res.json(relation.rows)
        } catch(e) {
            console.log(e)
        }
    }
    async post(req, res) {
        try {
            await RelationService.post(req.body)
            res.json(req.body)
        } catch(e) {
            console.log(e)
        }
    }
    async update(req, res) {
        try {
            await RelationService.update(req.params, req.body)
            res.json('ИЗМЕНЕНО')
        } catch(e) {
            console.log(e)
        }
    }
    async delete(req, res) {
        try {
            await RelationService.delete(req.params)
            res.json('УДАЛЕНО')
        } catch(e) {
            console.log(e)
        }
    }
}

module.exports = new RelationsController()