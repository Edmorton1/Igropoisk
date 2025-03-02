const db = require('./db.js')

class Middlewares {
    user(req, res, next) {
        if (req.user == req.params.id && req.user != undefined) {
            return next()
        } return res.json('Нет прав'), console.log('Нет прав')
    }
    comment(req, res, next) {
        console.log(req.user, req.body)
        if (req.user == req.body.user_id && req.user != undefined){
            return next()
        } return res.json('Нет прав'), console.log('Нет прав')
    }
    async comment_delete(req, res, next) {
        const com_user_id = await (await db.query(`SELECT * FROM comments WHERE id = $1`, [req.params.id])).rows[0].user_id
        console.log(req.user, com_user_id)
        if (req.user == com_user_id && req.user != undefined){
            return next()
        } return res.json('Нет прав'), console.log('Нет прав') 
    }
    relations(req, res, next) {
        console.log(req.user, req.params)
        if ((req.user == req.body.user_id) && req.user != undefined){
            return next()
        } return res.json('Нет прав'), console.log('Нет прав')
    }
    admin(req, res, next) {
        if (req.user == '90') {
            return next()
        } return res.json('Нет прав'), console.log('Нет прав')
    }
    avatar(req, res, next) {
        if (req.user) {
            return next()
        } return res.json('Нет прав'), console.log('Нет прав')
    }
}

module.exports = new Middlewares()