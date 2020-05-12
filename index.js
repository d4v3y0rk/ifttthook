const express = require('express')
var Redis = require('ioredis')
var redis = new Redis(process.env.REDIS_URL)
const app = express()
const port = process.env.PORT

app.use(express.json()) 
app.use(express.urlencoded({ extended: true }))

app.post('/garage', async (req, res) => {
    console.log(req.body)
    await redis.set("garage", "toggle")
    res.sendStatus(200)
})

app.get('/garage', async (req, res) => {
    var value = await redis.get("garage")
    res.send(value)
})

app.post('/geofence', async (req, res) => {
    console.log(req.body)
    await redis.set("location", req.body)
    res.sendStatus(200)
})

app.get('/geofence', async (req, res) => {
    var value = await redis.get("location")
    res.send(value)
})

app.get('/', async (req, res) => {
    res.send("Nothing to see here.")
})
app.listen(port, () => console.log(`IfTTT Hook App Listening...`))