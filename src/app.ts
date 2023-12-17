import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import cors from 'cors'
import passport from 'passport'
import routes from './routes'
import { config } from './config/config'

// initializations
const app = express()
dotenv.config()

const port = config.PORT
app.set('port', port)

app.use(morgan('dev'))
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(passport.initialize())

// routes
app.get('/', (req, res) => {
  res.send(`Welcome to ${config.APP_NAME}`)
})

app.use(routes)

export default app
