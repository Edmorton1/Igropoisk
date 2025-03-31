const { Pool } = require('pg')
const pool = new Pool({
    user: "postgres",
    password: "VCaToZvZwFMRmnpVBZyIAyRRBOTZcGJi",
    host: "tramway.proxy.rlwy.net",
    port: 13154,
    database: "railway"
})

module.exports = pool



// const { Pool } = require('pg')
// const pool = new Pool({
//     user: "postgres",
//     password: "stalin",
//     host: "localhost",
//     post: 5432,
//     database: "igropoisk"
// })

// module.exports = pool