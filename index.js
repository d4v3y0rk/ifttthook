const express = require('express')
const app = express()
const port = process.env.PORT

app.get('/', (req, res) => {
    try {
        console.log(req.body)
    } catch (error) {
        console.log(`no request body...`)
    }
    res.sendStatus(200)
})

app.listen(port, () => console.log(`IfTTT Hook App Listening...`))