import express from 'express'
import bodyParser from "body-parser"
import ip from "ip"

// for SSL
import fs from "fs"
import https from 'https'

import chat from "./lib/chat.mjs"

const app = express()
app.use(bodyParser.json())

// Cross-Origin Resource Sharing (CORS): application-level middleware
app.use((req, res, next) => {

    const origin = req.headers.origin

    const allowedClientOrigins = [
        // 'http://127.0.0.1:5173',
        // 'http://localhost:5173',
        // 'http://192.168.1.116:5173',
        origin // allow any origin
    ]


    console.log(`Request from ${origin}`)

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
    console.log(`Server listening on http://${IP}:${PORT}`)
    console.log('Press Ctrl+C to quit.')
})

// SSL
// const server = https.createServer({
//     key: fs.readFileSync(`server.key`, 'utf8'),
//     cert: fs.readFileSync(`server.cert`, 'utf8')
// }, app)

// console.log(`Server listening on https://${IP}:${PORT}`)
// console.log('Press Ctrl+C to quit.')

// await server.listen(3000);
