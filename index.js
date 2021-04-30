import express from 'express'
import bodyParser from 'body-parser'
import routes from './routes/index.js'

const app = express()
const port = 8000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(routes)

app.listen(port, () => {
  console.log(`Server running at port ${ port }`)
})