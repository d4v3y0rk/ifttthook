const express = require('express')
const app = express()
const port = process.env.PORT

app.get('/', (req, res) => {
    console.log(req.body)
    res.send(200)
})

app.listen(port, () => console.log(`IfTTT Hook App Listening...`))