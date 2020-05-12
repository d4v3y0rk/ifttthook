const express = require('express')
const redis = require("redis")
const app = express()
const client = redis.createClient(process.env.REDIS_URL)
const port = process.env.PORT

app.use(express.json()) 
app.use(express.urlencoded({ extended: true }))

app.get('/toggle', (req, res) => {
    client.set("garage", "toggle", redis.print)
    res.sendStatus(200)
})

app.get('/', (req, res) => {
    console.log(client.get('garage'))
    client.set('garage', '', redis.print)
    res.sendStatus(200)
})
app.listen(port, () => console.log(`IfTTT Hook App Listening...`))