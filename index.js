const express = require('express')
const redis = require("redis")
const app = express()
const client = redis.createClient(process.env.REDIS_URL)
const port = process.env.PORT

app.use(express.json()) 
app.use(express.urlencoded({ extended: true }))

app.get('/toggle', async (req, res) => {
    await client.set("garage", "toggle", redis.print)
    res.sendStatus(200)
})

app.get('/', async (req, res) => {
    if (client.get('garage') == "toggle") {
        console.log(client.get('garage'))
        res.send(`Found the key...`)
    } else {
        res.send(`did not find the key.`)
    }
    await client.set('garage', '', redis.print)
    res.sendStatus(200)
})
app.listen(port, () => console.log(`IfTTT Hook App Listening...`))