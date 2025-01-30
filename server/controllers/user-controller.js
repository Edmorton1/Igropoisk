const Model = require('../services/user-service.js')

class UserController {
    async get(req, res) {
        try {
            const users = await Model.get()
            res.json(users.rows)
        } catch(e) {
            console.log(e)
        }
    }
    async post(req, res) {
        try {
            await Model.post(req.body)
            res.json(req.body)
        } catch(e) {
            console.log(e)
        }
    }
    async update(req, res) {
        try {
            await Model.update(req.params, req.body)
            res.json('ИЗМЕНЕНО')
        } catch(e) {
            console.log(e)
        }
    }
    async delete(req, res) {
        try {
            await Model.delete(req.params)
            res.json('УДАЛЕНО')
        } catch(e) {
            console.log(e)
        }
    }
}

module.exports = new UserController()