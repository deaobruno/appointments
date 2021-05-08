import { Router } from 'express'
import AppointmentValidator from '../app/middlewares/appointmentValidator.js'
import AppointmentController from '../app/controllers/appointment.js'

const router = Router()

router.route('/')
  .get(AppointmentController.findAll)
  .post(AppointmentValidator.createRules, AppointmentValidator.validateCreate, AppointmentController.create)

router.route('/:id')
  .get(AppointmentValidator.idRules, AppointmentValidator.validate, AppointmentController.findOne)
  .put(AppointmentValidator.updateRules, AppointmentValidator.validate, AppointmentController.update)
  .delete(AppointmentValidator.idRules, AppointmentValidator.validate, AppointmentController.delete)

router.get('/user/:id', AppointmentValidator.userIdRules, AppointmentValidator.validate, AppointmentController.findByUser)

export default router