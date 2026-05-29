import express from 'express'
import dotenv from 'dotenv'
import handlebars from 'express-handlebars'
import multer from 'multer'
import http from 'http'
import { Server } from 'socket.io'
import connectDB from './config/db.js'
import router from './api/routes/routes.index.js'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

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
app.use(express.static(join(__dirname, '../public')))

app.engine('handlebars', handlebars.engine({
    layoutsDir: join(__dirname, 'views/layouts'),
    partialsDir: join(__dirname, 'views/partials'),
    defaultLayout: 'main'
}))
app.set('view engine', 'handlebars')
app.set('views', join(__dirname, 'views'))

app.use('/api', router)

app.get('/', (req, res) => {
    res.render('home')
})

const port = process.env.PORT

app.listen(port, () => {
    console.log(`Servidor iniciado http://localhost:${port}`)
})