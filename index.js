var compression = require('compression')
const express = require('express')
var Redis = require('ioredis')
var redis = new Redis(process.env.REDIS_URL)
const app = express()
app.use(compression())
const port = process.env.PORT

app.use(express.json()) 
app.use(express.urlencoded({ extended: true }))
app.disable('x-powered-by')

app.post('/rest/garage', async (req, res) => {
    console.log(`POST: got a call to /rest/garage`)
    console.log(req.body.action)
    await redis.set("garage", req.body.action)
    res.sendStatus(200)
})

app.get('/rest/garage', async (req, res) => {
    console.log(`GET: got a call to /rest/garage`)
    var value = await redis.get("garage")
    var response = {
        "action": value
    }
    await redis.set('garage', '')
    res.json(response)
})

app.post('/rest/geofence', async (req, res) => {
    console.log(`POST: got a call to /rest/geofence`)
    console.log(req.body)
    await redis.set("location", req.body)
    res.sendStatus(200)
})

app.get('/rest/geofence', async (req, res) => {
    console.log(`GET: got a call to /rest/geofence`)
    var value = await redis.get("location")
    res.send(value)
})

app.get('/rest/', async (req, res) => {
    console.log(`got a call to /rest/`)
    res.send("Nothing to see here.")
})
app.listen(port, () => console.log(`IfTTT Hook App Listening...`))
