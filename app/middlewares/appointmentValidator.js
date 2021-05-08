import { body, param, validationResult } from 'express-validator'
import Appointment from '../models/appointment.js'

class AppointmentValidator {
  constructor() {
    let today = new Date()
    today.setDate(today.getDate() - 1)
    let todayMonth = today.getMonth() + 1
    todayMonth = (todayMonth < 10 ? '0' : '') + todayMonth
    let todayDate = today.getDate() < 10 ? '0' + today.getDate() : today.getDate()
    
    this.todayWithoutTime = `${ today.getFullYear() }-${ todayMonth }-${ todayDate }`
    this.timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/

    this.idRules = [
      param('id').notEmpty()
        .trim()
        .escape()
        .isMongoId()
        .withMessage('Wrong format'),
    ]

    this.userIdRules = [
      param('id').notEmpty()
        .trim()
        .escape()
        .isMongoId()
        .withMessage('Wrong format'),
    ]

    this.createRules = [
      body('date').notEmpty()
        .withMessage('Missing attribute')
        .trim()
        .escape()
        .isDate({ format: 'YYYY-MM-DD', delimiters: ['-'] })
        .withMessage('Wrong format')
        .isAfter(this.todayWithoutTime)
        .withMessage('Must be today or greater'),

      body('start').notEmpty()
        .trim()
        .escape()
        .matches(this.timeRegex)
        .withMessage('Wrong format'),

      body('end').notEmpty()
        .trim()
        .escape()
        .matches(this.timeRegex)
        .withMessage('Wrong format')
        .custom((end, { req }) => end > req.body.start)
        .withMessage('Must be grater than start time'),

      body('user_id').notEmpty()
        .trim()
        .escape()
        .isMongoId()
        .withMessage('Wrong format'),
    ]

    this.updateRules = [
      param('id').notEmpty()
        .trim()
        .escape()
        .isMongoId()
        .withMessage('Wrong format'),

      body('date').if(date => typeof date !== 'undefined')
        .trim()
        .escape()
        .isDate({ format: 'YYYY-MM-DD', delimiters: ['-'] })
        .withMessage('Wrong format')
        .isAfter(this.todayWithoutTime)
        .withMessage('Must be today or greater'),

      body('start').if(start => typeof start !== 'undefined')
        .trim()
        .escape()
        .matches(this.timeRegex)
        .withMessage('Wrong format'),

      body('end').if(end => typeof end !== 'undefined')
        .trim()
        .escape()
        .matches(this.timeRegex)
        .withMessage('Wrong format')
        .custom((end, { req }) => end > req.body.start)
        .withMessage('Must be grater than start time'),

      body('user_id')
        .if(user => typeof user !== 'undefined')
        .trim()
        .escape()
        .isMongoId()
        .withMessage('Wrong format'),
    ]
  }

  async validateCreate(req, res, next) {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      res.status(400).send(errors.array())
      return
    }

    let result = await Appointment.findOne(req.body)

    if (result) {
      res.status(409).send({ error: 'Appointment already registered!' })
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

export default new AppointmentValidator()