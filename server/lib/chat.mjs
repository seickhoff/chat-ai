import { config } from "dotenv"
config()

import { Configuration, OpenAIApi } from "openai"

const openAi = new OpenAIApi(
    new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    })
)

let history = [];

async function chat(input) {

    let response = null

    history.push({
        role: "user",
        content: input
    })

    try {
        response = await openAi.createChatCompletion({
            model: "gpt-3.5-turbo",
            temperature: 0.2,
            messages: history
        })

        response = response.data.choices[0].message.content

        history.push({
            role: "system",
            content: response
        })
    }
    catch (err) {
        response = (`${err.name}: ${err.message}`)
    }

    return response
}

export default chat;