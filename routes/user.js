import { Router } from 'express'
import UserValidator from '../app/middlewares/userValidator.js'
import UserController from '../app/controllers/user.js'

const router = Router()

router.route('/')
  .get(UserController.findAll)
  .post(UserValidator.createRules, UserValidator.validateCreate, UserController.create)

router.route('/:id')
  .get(UserValidator.idRules, UserValidator.validate, UserController.findOne)
  .put(UserValidator.updateRules, UserValidator.validate, UserController.update)
  .delete(UserValidator.idRules, UserValidator.validate, UserController.delete)

export default router