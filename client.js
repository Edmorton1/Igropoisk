const express = require("express")
const path = require("path")

const app = express()

app.use(express.static(path.join(__dirname, '/dist')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, "/dist", "index.html"))
})

app.listen(5000, () => console.log(`СЕРВЕР ЗАПУЩЕН ${5000}`))