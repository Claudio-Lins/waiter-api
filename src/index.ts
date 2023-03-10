import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
import http from 'node:http'
import path from 'node:path'
import { Server } from 'socket.io'

import { router } from './router'

const app = express()
const server = http.createServer(app)
export const io = new Server(server)

io.on('connect', () => {
  console.log('Connected to socket.io')
})

mongoose.connect('mongodb+srv://admin:admin@cluster0.gpu9lve.mongodb.net/?retryWrites=true&w=majority')
// mongoose.connect('mongodb://localhost:27017')
  .then(() => {

    const port = 3333

    app.use(cors())
    app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))
    app.use(express.json())
    app.use(router)

    server.listen(port, () => {
      console.log(`🚀 Server is running on http://localhost:${port}`)
      console.log('Connected to MongoDB!!!')
    })
  })
  .catch(err => console.error('Could not connect to MongoDB!', err))
