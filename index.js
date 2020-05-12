const express = require('express')
const app = express()
const client = require('redis').createClient(process.env.REDIS_URL)
const port = process.env.PORT

app.use(express.json()) 
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    console.log(req)
    res.sendStatus(200)
})

app.listen(port, () => console.log(`IfTTT Hook App Listening...`))