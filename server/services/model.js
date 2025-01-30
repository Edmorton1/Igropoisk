const db = require('../db.js')

class UserModel {
    async get(table) {
        try {
            const response = await db.query(`SELECT * FROM ${table} ORDER BY id DESC`)
            return response
        } catch(e) {
            console.log(e)
        }
    }
    async post(data, table) {
        try {
            const keys = Object.keys(data)
            const values = Object.values(data)
            const dollars = values.map((e, i) => (`$${i + 1}`))
            await db.query(`INSERT INTO ${table}(${keys}) VALUES(${dollars})`, values)
        } catch(e) {
            console.log(e)
        }
    }
    async update(id, data, table) {
        try {
            const keys = Object.keys(data)
            const values = Object.values(data)
            const requeest = keys.map((e, i) => (`${e} = '${values[i]}'`)).join(', ')
            await db.query(`UPDATE ${table} SET ${requeest} WHERE id = ${id}`)
        } catch(e) {
            console.log(e)
        }
    }
    async delete(id, table) {
        try {
            await db.query(`DELETE FROM ${table} WHERE id = ${id}`)
        } catch(e) {
            console.log(e)
        }
    }
}

module.exports = new UserModel()