import { router as courseRoutes } from './routes/courseRoutes.js'
import { router as authRoutes } from './routes/authRoutes.js'
import express from 'express'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import mongoose from 'mongoose'
import cors from 'cors'
import livereload from 'livereload'
import connectLiveReload from 'connect-livereload'
import * as locals from './app.locals.js'
import { checkUser } from './middleware/authMiddleware.js'

// live reload

const liveReloadServer = livereload.createServer()
liveReloadServer.watch(locals.liveReloadPublic)

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
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to db')
    app.listen(port, () => console.log(`Running on http://localhost:${port}`))
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
app.use(cookieParser())

// index page
app.get('*', checkUser)
app.get('/', (req, res) => res.render('index'))

// routes
app.use('/courses', courseRoutes)
app.use(authRoutes)

// 404 Page
app.use((req, res) => res.status(404).render('404', { title: '404' }))
