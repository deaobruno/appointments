import express from 'express'
import appointmentRouter from './appointment.js'
import userRouter from './user.js'

const app = express()

app.use('/appointment', appointmentRouter)
app.use('/user', userRouter)

app.use((req, res) => {
  res.status(404).send({ 'error': 'Not found!' })
})

app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  if (err) {
    res.status(500).send({ error: err.message })
  }

  next()
})

export default app