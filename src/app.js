import express from 'express'
import dotenv from 'dotenv'
import handlebars from 'express-handlebars'
import multer from 'multer'
import http from 'http'
import { Server } from 'socket.io'
import connectDB from './config/db.js'

dotenv.config()

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: '*'
    }
})

connectDB()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('./public'))

app.engine('handlebars', handlebars.engine())
app.set('view-engine', 'handlebars')
app.set('views', `${process.cwd()}/src/views`)

const port = process.env.PORT

app.listen(port, () => {
    console.log(`Servidor iniciado http://localhost:${port}`)
})