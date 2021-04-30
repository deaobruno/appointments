import { Router } from 'express'
import appointmentRouter from './appointment.js'

const router = Router()

appointmentRouter(router)

export default router