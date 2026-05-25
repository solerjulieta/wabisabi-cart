import express from 'express'
import handlebars from 'express-handlebars'
import multer from 'multer'
import http from 'http'
import { Server } from 'socket.io'

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: '*'
    }
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('./public'))

app.engine('handlebars', handlebars.engine())
app.set('view-engine', 'handlebars')
app.set('views', `${process.cwd()}/src/views`)

const PORT = 8080

app.listen(PORT, () => {
    console.log(`Servidor iniciado http://localhost:${port}`)
})