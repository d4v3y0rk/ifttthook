const express = require('express')
const app = express()
const port = process.env.PORT

app.use(express.json()) 
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    console.log(req.body)
    res.sendStatus(200)
})

app.listen(port, () => console.log(`IfTTT Hook App Listening...`))