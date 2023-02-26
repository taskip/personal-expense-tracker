
import express, { Express, Request, Response } from 'express';
const testrouter = express.Router()

// define the home page route
testrouter.get('/', (req, res) => {
  res.send('Birds home page')
})
// define the about route
testrouter.get('/about', (req, res) => {
  res.send('About birds')
})

export default testrouter;