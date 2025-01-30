const UserService = require('../services/user-service.js')

class UserController {
    async get(req, res) {
        try {
            const users = await UserService.get()
            res.json(users.rows)
        } catch(e) {
            console.log(e)
        }
    }
    async post(req, res) {
        try {
            await UserService.post(req.body)
            res.json(req.body)
        } catch(e) {
            console.log(e)
        }
    }
    async update(req, res) {
        try {
            await UserService.update(req.params, req.body)
            res.json('ИЗМЕНЕНО')
        } catch(e) {
            console.log(e)
        }
    }
    async delete(req, res) {
        try {
            await UserService.delete(req.params)
            res.json('УДАЛЕНО')
        } catch(e) {
            console.log(e)
        }
    }
}

module.exports = new UserController()