

import express from 'express'
import bodyParser from "body-parser"

// import chat from "./chat.js" 



import { config } from "dotenv"
config()

import { Configuration, OpenAIApi } from "openai"

const openAi = new OpenAIApi(
    new Configuration({
        apiKey: process.env.OPEN_AI_API_KEY,
    })
)

async function chat(input) {

    let response = null

    try {
        response = await openAi.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "user",
                    content: input
                }],
        })

        response = response.data.choices[0].message.content
        console.log('RESPONSE: ' + response)
    }
    catch (err) {
        response = (`${err.name}: ${err.message}`)
        console.log('ERROR: ' + `${response}`)
    }

    return response
}

const app = express()
app.use(bodyParser.json())

// Cross-Origin Resource Sharing (CORS)
//    - application-level middleware
app.use((req, res, next) => {

    const allowedOrigins = [
        'http://127.0.0.1:5173', 
        'http://localhost:5173'
    ]

    const origin = req.headers.origin

    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin)
    }

    res.header('Access-Control-Allow-Methods', 'POST')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    res.header('Access-Control-Allow-Credentials', true)

    return next()
})

app.post('/', async (req, res) => {

    const question = req.body.q

    console.dir(question)

    const data =  await chat(question)

    console.dir(`data: ${data}`)
    
    res
        .header("Content-Type", 'application/json')
        .send(JSON.stringify(data, null, 4))
        .end()
})


// Start the server
const PORT = 8090
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
  console.log('Press Ctrl+C to quit.')
})