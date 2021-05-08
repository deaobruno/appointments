import { body, param, validationResult } from 'express-validator'
import User from '../models/user.js'

class UserValidator {
  constructor() {
    this.idRules = [
      param('id').notEmpty()
        .trim()
        .escape()
        .isMongoId()
        .withMessage('Wrong format'),
    ]

    this.createRules = [
      body('name').notEmpty()
        .withMessage('Missing attribute')
        .trim()
        .escape(),
    ]

    this.updateRules = [
      param('id').notEmpty()
        .trim()
        .escape()
        .isMongoId()
        .withMessage('Wrong format'),

      body('name')
        .if(name => typeof name !== 'undefined')
        .trim()
        .escape(),
    ]
  }

  async validateCreate(req, res, next) {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      res.status(400).send(errors.array())
      return
    }

    let result = await User.findOne(req.body)

    if (result) {
      res.status(409).send({ error: 'User already registered!' })
      return
    }

    next()
  }

  async validate(req, res, next) {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      res.status(400).send(errors.array())
      return
    }

    next()
  }
}

export default new UserValidator()