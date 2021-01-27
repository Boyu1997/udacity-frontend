var path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const fetch = require("node-fetch")

const baseUrl = "https://api.meaningcloud.com/sentiment-2.1"

const dotenv = require('dotenv')
dotenv.config()

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors());

app.use(express.static('dist'))

console.log(__dirname)

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})


app.get('/', function (req, res) {
    res.sendFile(path.resolve('dist/index.html'))
})

app.get('/data', async function (req, res) {
    const txt = req.query.txt

    const response = await fetch(
        `${baseUrl}?key=${process.env.API_KEY}&of=json&txt=${txt}&lang=en`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        }
    );

    try {
        const data = await response.json()
        res.send(data)
    } catch (error) {
        console.log("error", error);
    }
})
