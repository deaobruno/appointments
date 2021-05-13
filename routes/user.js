import {Router} from 'express';
import {UserValidator} from '../app/middlewares/user-validator.js';
import {UserController} from '../app/controllers/user.js';

const router = Router();
const validator = new UserValidator();
const user = new UserController();

router.route('/')
  .get(user.findAll)
  .post(validator.createRules, validator.validateCreate, user.create);

router.route('/:id')
  .get(validator.idRules, user.findOne)
  .put(validator.updateRules, validator.validate, user.update)
  .delete(validator.idRules, validator.validate, user.delete);

export {router};