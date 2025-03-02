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
    async getByUser(req, res) {
        try {
            const {user_id} = req.params
            const {game} = req.query
            const relation = await RelationService.getByUser(user_id, game)
            console.log(user_id)
            res.json(relation)
        } catch(e) {
            console.log(e)
        }
    }
    async getGradeGames(req, res) {
        const id = req.query.game
        const response = await RelationService.getGradeGames(id)
        res.json(response)
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