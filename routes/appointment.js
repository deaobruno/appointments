import {Router} from 'express'
import {AppointmentValidator} from '../app/middlewares/appointment-validator.js'
import {AppointmentController} from '../app/controllers/appointment.js'

const router = Router()
const validator = new AppointmentValidator()
const appointment = new AppointmentController()

router.route('/')
  .get(appointment.findAll)
  .post(validator.createRules, validator.validateCreate, appointment.create)

router.route('/:id')
  .get(validator.idRules, appointment.findOne)
  .put(validator.updateRules, validator.validateUpdate, appointment.update)
  .delete(validator.idRules, validator.validate, appointment.delete)

router.get('/user/:id', validator.userIdRules, validator.validateFindByUser, appointment.findByUser)

export {router}