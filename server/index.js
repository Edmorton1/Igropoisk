require('dotenv').config()
const express = require('express')
const cors =require('cors')
const cookieParser = require('cookie-parser')
const router = require('./router')
const app = express()
const compression = require('compression')
const bodyParser = require('body-parser')
const db = require('./db.js')
const path = require('path')

// app.options('*', cors());  // Это решает проблему с preflight запросами
app.use(bodyParser.json({limit: "50mb"}))
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(compression())
app.use(express.json())
app.use(cors({
    origin: ['https://igropoisk.up.railway.app', 'http://localhost:5000'],
    credentials: true
}))
app.use(cookieParser())

const user = async (req, res, next) => {
    try {
        const accessToken = req.header("Authorization").split(' ')[1].split('.')[1]
        const id = JSON.parse(atob(accessToken)).id
        const total = (await db.query(`SELECT * FROM users WHERE id = $1`, [id])).rows[0]
        req.user = id
        console.log(`${id}, МИДЛВЕЙР`)
    } catch {
        
    } finally {
        next()
    }
}

app.use('/avatars', express.static(path.resolve(__dirname, 'avatars')));
app.use(user)

app.use('/api', router)

app.get('/', (req, res) => {
    res.json('asdasdasdasd')
})

app.listen(3000, () => {console.log(`СЕРВЕР ЗАПУЩЕН НА ПОРТУ: ${process.env.BACKEND_SERVER}`)})