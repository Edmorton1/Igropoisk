const Router = require('express').Router
const router = new Router
const UserController = require('./controllers/user-controller.js')
const CommentsController = require('./controllers/comments-controller.js')
const RelationsController = require('./controllers/relations-controller.js')

router.get('/users', UserController.get)
router.put('/users/:id', UserController.update)
router.delete('/users/:id', UserController.delete)

router.get('/comments', CommentsController.get)
router.post('/comments', CommentsController.post)
router.put('/comments/:id', CommentsController.update)
router.delete('/comments/:id', CommentsController.delete)

router.get('/relations', RelationsController.get)
router.post('/relations', RelationsController.post)
router.put('/relations/:id', RelationsController.update)
router.delete('/relations/:id', RelationsController.delete)

router.post('/login', UserController.login)
router.post('/registration', UserController.registration)
// router.put('/logout', RelationsController.update)
// router.delete('/refresh', RelationsController.delete)

module.exports = router