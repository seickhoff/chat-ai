# Chat AI - ChatGPT OpenAI API Demo

This application has two parts:  a client and a server.  The client is built using React.  There, enter questions and view the results.  The client is similar to a chat session or Wolfram Notebook session, listing pairs of questions and answers. 

The server receives questions from the client and calls OpenAI API then returns the results.

To set up the environment

- Client: In the application base directory, run `npm install`
- Server: In `./server` run `npm install`
- Server: Create a file called `.env` in `./server` and add your API Key
    - `OPENAI_API_KEY=000000000000000000000000000000000000000000000000000`
    - See here to create an account and get your key: https://platform.openai.com/account/api-keys

To run the application

- Client: In the application base directory, run `npm run client`
- Server: In `./server`, run `node index.mjs`

Open up a browser and navigate to http://localhost:5173/

## Markdown

The response from OpenAI contains markdown, so the response is rendered in a markdown container.

### Dialog with the AI

![image](https://user-images.githubusercontent.com/2509012/226797350-539a611a-8467-43d0-8870-f95a90b72688.png)
