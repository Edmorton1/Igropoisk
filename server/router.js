const Router = require('express').Router
const router = new Router
const UserController = require('./controllers/user-controller.js')
const CommentsController = require('./controllers/comments-controller.js')
const RelationsController = require('./controllers/relations-controller.js')
const steamController = require('./controllers/steam-controller.js')
const Middlewares = require('./middlewares.js')

router.get('/users', UserController.get)
router.put('/users/:id', Middlewares.user, UserController.update)
router.delete('/users/:id', Middlewares.user, UserController.delete)
router.get('/users/:nickname', UserController.getByNickname)
router.get('/check', UserController.checkInUsers)
// router.post('/uploadAvatar', UserController.uploadAvatar)

router.get('/comments', CommentsController.get)
router.get('/comments/:game', CommentsController.getByGame)
router.post('/comments', Middlewares.comment, CommentsController.post)
router.put('/comments/:id', Middlewares.comment, CommentsController.update)
router.delete('/comments/:id', Middlewares.comment_delete, CommentsController.delete)

router.get('/relations', RelationsController.get)
router.post('/relations', Middlewares.relations, RelationsController.post)
router.put('/relations/:id', Middlewares.relations, RelationsController.update)
// router.delete('/relations/:id', Middlewares.relations, RelationsController.delete)
router.get('/relations/:user_id', RelationsController.getByUser)
router.get('/grades', RelationsController.getGradeGames)

router.post('/login', UserController.login)
router.post('/registration', UserController.registration)
router.get('/logout', UserController.logout)
router.post('/refresh', UserController.refresh)
router.get('/refreshAccess', UserController.refreshAccess)

router.get('/game/:id', steamController.game)
router.get('/gameDB/:id', steamController.gameDB)
router.get('/allGamesAPI', Middlewares.admin, steamController.WrapperPush)
router.get('/getSearch', steamController.getSearch)
// router.post('/refreshAllGames', steamController.getHun)
// router.delete('/refreshAllGames', steamController.deleteAll)
// router.get('/allGames', steamController.getAll)
router.get(`/appids`, steamController.appids)
router.get('/getEverything', steamController.getEverything)
router.get('/postAppids', Middlewares.admin, steamController.postAppids)
// router.get('/getByRating', steamController.getByRating)

const {upload, fileController} = require('./controllers/file-controller.js')
router.post('/uploadAvatar', Middlewares.avatar, upload.single('avatar'), fileController.UploadAvatar)


module.exports = router