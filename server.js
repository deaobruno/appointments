import express from 'express'
import bodyParser from 'body-parser'
import {app as routes} from './routes/index.js'

const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use(routes)

export {app}