const CommentService = require('../services/comments-service.js')

class CommentsController {
    async get(req, res) {
        try {
            const comment = await CommentService.get()
            res.json(comment.rows)
        } catch(e) {
            console.log(e)
        }
    }
    async getByGame(req, res) {
        try {
            const {game} = req.params
            const comment = await CommentService.getByGame(game)
            res.json(comment.rows)
        } catch(e) {
            console.log(e)
        }
    }
    async post(req, res) {
        try {
            const zapros = await CommentService.post(req.body)
            res.json(zapros)
        } catch(e) {
            console.log(e)
        }
    }
    async update(req, res) {
        try {
            const zapros = await CommentService.update(req.params, req.body)
            res.json(zapros)
        } catch(e) {
            console.log(e)
        }
    }
    async delete(req, res) {
        try {
            const zapros = await CommentService.delete(req.params)
            res.json(zapros)
        } catch(e) {
            console.log(e)
        }
    }
}

module.exports = new CommentsController()