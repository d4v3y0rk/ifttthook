const express = require('express')
const app = express()
const port = process.env.PORT
const bodyParser = require('body-parser')

app.use(bodyParser)

app.get('/', (req, res) => {
    console.log(req.body)
    res.sendStatus(200)
})

app.listen(port, () => console.log(`IfTTT Hook App Listening...`))