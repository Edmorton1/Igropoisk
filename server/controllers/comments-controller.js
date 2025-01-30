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
    async post(req, res) {
        try {
            await CommentService.post(req.body)
            res.json(req.body)
        } catch(e) {
            console.log(e)
        }
    }
    async update(req, res) {
        try {
            await CommentService.update(req.params, req.body)
            res.json('ИЗМЕНЕНО')
        } catch(e) {
            console.log(e)
        }
    }
    async delete(req, res) {
        try {
            await CommentService.delete(req.params)
            res.json('УДАЛЕНО')
        } catch(e) {
            console.log(e)
        }
    }
}

module.exports = new CommentsController()