const express = require('express')
var Redis = require('ioredis')
var redis = new Redis(process.env.REDIS_URL)
const app = express()
const port = process.env.PORT

app.use(express.json()) 
app.use(express.urlencoded({ extended: true }))

app.get('/toggle', (req, res) => {
    redis.set("garage", "toggle")
    res.sendStatus(200)
})

app.get('/store', (req, res) => {
    console.log(req.body)
    redis.set("location", req.body)
    res.sendStatus(200)
})

app.get('/', (req, res) => {
    var myVar = redis.get('garage')
    if ( myVar == "toggle") {
        console.log(myVar)
        res.send(`Found the key...`)
    } else {
        res.send(`did not find the key.`)
    }
    redis.set('garage', '')
    res.sendStatus(200)
})
app.listen(port, () => console.log(`IfTTT Hook App Listening...`))