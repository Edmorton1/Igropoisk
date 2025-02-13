const Router = require('express').Router
const router = new Router
const UserController = require('./controllers/user-controller.js')
const CommentsController = require('./controllers/comments-controller.js')
const RelationsController = require('./controllers/relations-controller.js')
const steamController = require('./controllers/steam-controller.js')

router.get('/users', UserController.get)
router.put('/users/:id', UserController.update)
router.delete('/users/:id', UserController.delete)
router.get('/users/:nickname', UserController.getByNickname)

router.get('/comments', CommentsController.get)
router.get('/comments/:game', CommentsController.getByGame)
router.post('/comments', CommentsController.post)
router.put('/comments/:id', CommentsController.update)
router.delete('/comments/:id', CommentsController.delete)

router.get('/relations', RelationsController.get)
router.post('/relations', RelationsController.post)
router.put('/relations/:id', RelationsController.update)
router.delete('/relations/:id', RelationsController.delete)
router.get('/relations/:user_id', RelationsController.getByUser)

router.post('/login', UserController.login)
router.post('/registration', UserController.registration)
router.get('/logout', UserController.logout)
router.post('/refresh', UserController.refresh)

router.get('/game/:id', steamController.game)
router.get('/allGamesAPI', steamController.WrapperPush)
// router.post('/refreshAllGames', steamController.getHun)
// router.delete('/refreshAllGames', steamController.deleteAll)
// router.get('/allGames', steamController.getAll)
router.get(`/appids`, steamController.appids)
router.get('/getEverything', steamController.getEverything)
router.get('/postAppids', steamController.postAppids)
// router.get('/getByRating', steamController.getByRating)

module.exports = router