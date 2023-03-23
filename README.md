# Chat AI - ChatGPT OpenAI API Demo

This application has two parts:  a client and a server.  The client is the UI using React.  Enter questions and view the results.  The server sends the questions to the OpenAI API and returns the results.

To set up the environment

- Client: In the application base directory, run `npm install`
- Server: In `./server` run `npm install`
- Server: Create a file called `.env` in `./server` and add your API Key
    - `OPENAI_API_KEY=000000000000000000000000000000000000000000000000000`

To run the application

- Client: In the application base directory, run `npm run client`
- Server: In `./server`, run `node index.mjs`

Open up a browser and navigate to http://localhost:5173/

## Markdown

The response from OpenAI contains markdown, so the response is rendered in a markdown container.

### Dialog with the AI

![image](https://user-images.githubusercontent.com/2509012/226797350-539a611a-8467-43d0-8870-f95a90b72688.png)
