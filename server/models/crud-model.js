const db = require('../db.js')

class CrudModel {
    async get(table) {
        try {
            return await db.query(`SELECT * FROM ${table}`)
        } catch(e) {
            console.log(e)
        }
    }

    async post(data, table) {
        try {
            const keys = Object.keys(data)
            const values = Object.values(data)
            const dollars = values.map((e, i) => (`$${i + 1}`))
            const zapros = await db.query(`INSERT INTO ${table}(${keys}) VALUES(${dollars}) RETURNING *`, values)
            return zapros.rows
        } catch(e) {
            console.log(e)
        }
    }

    async update(id, data, table) {
        try {
            const keys = Object.keys(data)
            const values = Object.values(data)
            const requeest = keys.map((e, i) => (`${e} = $${i + 1}`)).join(', ')
            const zapros = await db.query(`UPDATE ${table} SET ${requeest} WHERE id = $${keys.length + 1} RETURNING *`, [...values, id])
            return zapros.rows
        } catch(e) {
            console.log(e)
        }
    }
    async delete(key, value, table) {
        try {
            const zapros = await db.query(`DELETE FROM ${table} WHERE ${key} = $1 RETURNING *`, [value])
            return zapros.rows
        } catch(e) {
            console.log(e)
        }
    }
}

module.exports = new CrudModel()