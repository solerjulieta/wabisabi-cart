import express from 'express'
import handlebars from 'express-handlebars'
import multer from 'multer'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine('handlebars', handlebars.engine())
app.set('view-engine', 'handlebars')
app.set('views', `${process.cwd()}/src/views`)

const PORT = 8080

app.listen(PORT, () => {
    console.log(`Servidor iniciado http://localhost:${port}`)
})