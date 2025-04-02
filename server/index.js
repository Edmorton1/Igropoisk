const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())

app.get('/data', (req, res) => {
  res.json('dathjghghjgjha')
})

app.get('/', (req, res) => {
  res.json('dathjghghjgjha')
})

app.listen(3000, () => console.log('SERVER'))