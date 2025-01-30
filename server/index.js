require('dotenv').config()
const express = require('express')
const cors =require('cors')
const cookieParser = require('cookie-parser')
const router = require('./router')
const app = express()

app.get('/', (req, res) => {
    res.json('')
})

app.use(express.json())
app.use(cors())
app.use(cookieParser())

app.use('/api', router)

app.listen(process.env.PORT, () => {console.log(`СЕРВЕР ЗАПУЩЕН НА ПОРТУ: http://localhost:${process.env.PORT}`)})