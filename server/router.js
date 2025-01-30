const Router = require('express').Router
const router = new Router
const UserController = require('./controllers/user-controller.js')

router.get('/users', UserController.get)
router.post('/users', UserController.post)
router.put('/users/:id', UserController.update)
router.delete('/users/:id', UserController.delete)

module.exports = router