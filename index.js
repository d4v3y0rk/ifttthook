const express = require('express')
var Redis = require('ioredis')
var redis = new Redis(process.env.REDIS_URL)
const app = express()
const port = process.env.PORT

app.use(express.json()) 
app.use(express.urlencoded({ extended: true }))

app.get('/toggle', async (req, res) => {
    await redis.set("garage", "toggle")
    res.sendStatus(200)
})

app.get('/store', async (req, res) => {
    console.log(req.body)
    await redis.set("location", req.body)
    res.sendStatus(200)
})

app.get('/', async (req, res) => {
    var myVar = await redis.get('garage')
    console.log(myVar)
    if ( myVar == "toggle") {
        res.send(`Found the key...`)
    } else {
        res.send(`did not find the key.`)
    }
    await redis.set('garage', '')
})
app.listen(port, () => console.log(`IfTTT Hook App Listening...`))