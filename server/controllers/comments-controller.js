const CommentsService = require('../services/comments-service.js')

class CommentsController {
    async get(req, res) {
        try {
            const comment = await CommentsService.get()
            res.json(comment.rows)
        } catch(e) {
            console.log(e)
        }
    }
    async post(req, res) {
        try {
            await CommentsService.post(req.body)
            res.json(req.body)
        } catch(e) {
            console.log(e)
        }
    }
    async update(req, res) {
        try {
            await CommentsService.update(req.params, req.body)
            res.json('ИЗМЕНЕНО')
        } catch(e) {
            console.log(e)
        }
    }
    async delete(req, res) {
        try {
            await CommentsService.delete(req.params)
            res.json('УДАЛЕНО')
        } catch(e) {
            console.log(e)
        }
    }
}

module.exports = new CommentsController()