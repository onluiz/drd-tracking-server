# Desafio Resultados Digitais - Tracking Server

- run npm install or yarn install to install the project dependencies

## Running in dev
- yarn dev
- PORT: src -> configs -> express.js
- MongoDB path: src -> configs -> mongoose.js

## Data
- GET https://localhost:PORT/cookies to see all the tracks saved
- POST https://localhost:PORT/cookies to save new tracks (check src -> trackModel.js)

## TODOS
- Remove non-used dependencies from package.json
- Add unit tests
- Add ENV vars for dev port
