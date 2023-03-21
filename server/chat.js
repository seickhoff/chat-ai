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

    response = response.replace(/\r?\n/g, "<br>");

    return response
}

export default chat;