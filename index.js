var compression = require('compression')
const express = require('express')
var Redis = require('ioredis')
const port = process.env.PORT
var redis = new Redis(process.env.REDIS_URL)
const app = express()
app.use(compression())

app.use(express.json()) 
app.use(express.urlencoded({ extended: true }))
app.disable('x-powered-by')

app.post('/rest/garage', async (req, res) => {
    console.log(`POST: got a call to /rest/garage action: ${req.body.action}`)
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

app.get('/rest/', async (req, res) => {
    console.log(`got a call to /rest/`)
    res.send("Nothing to see here.")
})
app.listen(port, () => console.log(`Garage API Listening...`))
