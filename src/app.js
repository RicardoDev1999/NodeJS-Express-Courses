import { router as courseRoutes } from './routes/courseRoutes.js'
import express from 'express'
import morgan from 'morgan'
import mongoose from 'mongoose'
import cors from 'cors'
import livereload from 'livereload'
import connectLiveReload from 'connect-livereload'
import * as locals from './app.locals.js'
import 'dotenv/config'

// live reload

const liveReloadServer = livereload.createServer()
liveReloadServer.watch(locals.liveReloadPublic);

liveReloadServer.server.once('connection', () => {
  setTimeout(() => {
    liveReloadServer.refresh('/')
  }, 100)
})

// express app
const app = express()

app.disable('x-powered-by')
app.locals = locals

const port = process.env.PORT || 3000

// connect to mongodb
const dbURI =
  'mongodb+srv://server-db-user:2CK8e06aQDjyvJCp@cluster0.gz81r.mongodb.net/NodeServer?retryWrites=true&w=majority'

mongoose
  .connect(dbURI)
  .then(() => {
    console.log('Connected to db')
    app.listen(port, () => console.log(`Running on https://localhost:${port}`))
  })
  .catch((err) => console.log(err))

// register view engine
app.set('view engine', 'ejs')
app.set('views', locals.views)

// middleware & static files
app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(connectLiveReload())
app.use(morgan('dev'))

// index page
app.get('/', (req, res) => res.render('index'))

// routes
app.use('/courses', courseRoutes)

// 404 Page
app.use((req, res) => res.status(404).render('404', { title: '404' }))
