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
            const zapros = await RelationService.post(req.body)
            res.json(zapros)
        } catch(e) {
            console.log(e)
        }
    }
    async update(req, res) {
        try {
            const zapros = await RelationService.update(req.params, req.body)
            res.json(zapros)
        } catch(e) {
            console.log(e)
        }
    }
    async delete(req, res) {
        try {
            const zapros = await RelationService.delete(req.params)
            res.json(zapros)
        } catch(e) {
            console.log(e)
        }
    }
}

module.exports = new RelationsController()