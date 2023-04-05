import express from 'express'
import bodyParser from "body-parser"
import ip from "ip"

import chat from "./lib/chat.mjs"

const app = express()
app.use(bodyParser.json())

// Cross-Origin Resource Sharing (CORS): application-level middleware
app.use((req, res, next) => {

    const allowedClientOrigins = [
        'http://127.0.0.1:5173',
        'http://localhost:5173',
        'http://192.168.1.116:5173'
    ]

    const origin = req.headers.origin

    if (allowedClientOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin)
    }

    res.header('Access-Control-Allow-Methods', 'POST')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    res.header('Access-Control-Allow-Credentials', true)

    return next()
})

// process the request
app.post('/', async (req, res) => {

    const question = req.body.q
    let data = await chat(question)

    res
        .header("Content-Type", 'application/json')
        .send(JSON.stringify(data, null, 4))
        .end()
})

const PORT = 3000
const IP = ip.address()

// start the server
app.listen(PORT, IP, () => {
    console.log(`Server listening on port ${IP}:${PORT}`)
    console.log('Press Ctrl+C to quit.')
})