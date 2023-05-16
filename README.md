# Chat AI - ChatGPT OpenAI API Demo

This application has two parts:  a client and a server.  The client is built using React.  There, enter questions and view the results.  The client is similar to a chat session or Wolfram Notebook session, listing pairs of questions and answers. 

The server receives questions from the client and calls OpenAI API then returns the results.

To set up the environment

- Client: In the application base directory, run `npm install`
- Server: In `./server` run `npm install`
- Server: Create a file called `.env` in `./server` and add your API Key
    - `OPENAI_API_KEY=000000000000000000000000000000000000000000000000000`
    - See here to create an account and get your key: https://platform.openai.com/account/api-keys

To run the client and server with one command: 

- `npm run app`

To run the client and server seperately: 

- Client: `npm run client`
- Server: `npm run server`

Open up a browser and navigate to http://localhost:5173/

## Markdown

The response from OpenAI contains markdown, so the response is rendered in a markdown container.

### Dialog with the AI

![image](https://user-images.githubusercontent.com/2509012/226797350-539a611a-8467-43d0-8870-f95a90b72688.png)


### SSL Setup

Client:

Install Dev Dependency:

`npm install vite-plugin-mkcert -D`

Update config:

vite.config.ts
```
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mkcert from 'vite-plugin-mkcert' // add import

// https://vitejs.dev/config/
export default defineConfig({
  server: { https: true }, // add https: true
  plugins: [mkcert(), react()], // add mkcert
})
```

Server:

Use OpenSSL to create certs:

```
cd server
openssl req -nodes -new -x509 -keyout server.key -out server.cert
```

- server.cert: The self-signed certificate file.
- server.key: The private key of the certificate.

Common Name (e.g. server FQDN or your name): localhost

`index.mjs`

```
// for SSL
import fs from "fs"
import https from 'https'
....

// SSL
const server = https.createServer({
    key: fs.readFileSync(`server.key`, 'utf8'),
    cert: fs.readFileSync(`server.cert`, 'utf8')
}, app)

console.log(`Server listening on https://${IP}:${PORT}`)
console.log('Press Ctrl+C to quit.')

await server.listen(3000);
```