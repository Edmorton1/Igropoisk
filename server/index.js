require('dotenv').config()
const express = require('express')
const cors =require('cors')
const cookieParser = require('cookie-parser')
const router = require('./router')
const app = express()
const compression = require('compression')
const bodyParser = require('body-parser')

app.use(bodyParser.json({limit: "50mb"}))
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(compression())
app.use(express.json())
app.use(cors({
    origin: process.env.FRONTEND_CLIENT,
    credentials: true
}))
app.use(cookieParser())

app.use('/api', router)

app.listen(process.env.PORT, () => {console.log(`СЕРВЕР ЗАПУЩЕН НА ПОРТУ: ${process.env.BACKEND_SERVER}`)})