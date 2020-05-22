const express = require('express')
const app = express()
const port = 3000

app.use(express.static(__dirname + "/www"));

app.get('/', (req, res) => res.send('index.html'))

app.listen(port, () => console.log(`Listening at http://localhost:${port}`))