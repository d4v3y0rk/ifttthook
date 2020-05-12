const express = require('express')
const redis = require("redis")
const app = express()
const redisClient = redis.createClient(process.env.REDIS_URL)
const port = process.env.PORT

app.use(express.json()) 
app.use(express.urlencoded({ extended: true }))

app.get('/toggle', async (req, res) => {
    await redisClient.set("garage", "toggle", redis.print)
    res.sendStatus(200)
})

app.get('/', async (req, res) => {
    var myVar = await redisClient.get('garage')
    if ( myVar == "toggle") {
        console.log(myVar)
        res.send(`Found the key...`)
    } else {
        res.send(`did not find the key.`)
    }
    await redisClient.set('garage', '', redis.print)
    res.sendStatus(200)
})
app.listen(port, () => console.log(`IfTTT Hook App Listening...`))