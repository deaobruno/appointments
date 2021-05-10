import { body, param, validationResult } from 'express-validator'
import Appointment from '../models/appointment.js'
import User from '../models/user.js'

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
        .withMessage('Missing attribute')
        .trim()
        .escape()
        .matches(this.timeRegex)
        .withMessage('Wrong format'),

      body('end').notEmpty()
        .withMessage('Missing attribute')
        .trim()
        .escape()
        .matches(this.timeRegex)
        .withMessage('Wrong format')
        .custom((end, { req }) => end > req.body.start)
        .withMessage('Must be grater than start time'),

      body('user_id').notEmpty()
        .withMessage('Missing attribute')
        .trim()
        .escape()
        .isMongoId()
        .withMessage('Wrong format'),
    ]

    this.updateRules = [
      param('id').notEmpty()
        .withMessage('Missing attribute')
        .trim()
        .escape()
        .isMongoId()
        .withMessage('Wrong format'),

      body().custom(body => Object.keys(body).length > 0)
        .withMessage('Missing attributes'),

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

      body('user_id').if(user => typeof user !== 'undefined')
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

    let appointment = await Appointment.findOne(req.body)

    if (appointment) {
      res.status(409).send({ error: 'Appointment already registered' })
      return
    }

    let startConflicts = await Appointment.find({
      date: req.body.date,
      user_id: req.body.user_id,
      start: { $lte: req.body.start },
      end: { $gte: req.body.start },
    })

    if (startConflicts.length > 0) {
      res.status(409).send({ error: 'Conflict with start date' })
      return
    }

    let endConflicts = await Appointment.find({
      date: req.body.date,
      user_id: req.body.user_id,
      start: { $lte: req.body.end },
      end: { $gte: req.body.end },
    })

    if (endConflicts.length > 0) {
      res.status(409).send({ error: 'Conflict with end date' })
      return
    }

    let startEndConflicts = await Appointment.find({
      date: req.body.date,
      user_id: req.body.user_id,
      start: { $gte: req.body.start },
      end: { $lte: req.body.end },
    })

    if (startEndConflicts.length > 0) {
      res.status(409).send({ error: 'Conflict with start and end date' })
      return
    }

    next()
  }

  async validateUpdate(req, res, next) {
    const errors = validationResult(req)

    let startConflicts
    let endConflicts
    let startEndConflicts

    if (!errors.isEmpty()) {
      res.status(400).send(errors.array())
      return
    }

    let appointment = await Appointment.findById(req.params.id)

    if (!appointment) {
      res.status(404).send({ error: 'Appointment not found' })
      return
    }

    if (req.body.start) {
      startConflicts = await Appointment.find({
        id: { $ne: req.params.id },
        date: req.body.date,
        user_id: req.body.user_id,
        start: { $lte: req.body.start },
        end: { $gte: req.body.start },
      })

      if (startConflicts.length > 0) {
        res.status(409).send({ error: 'Conflict with start date' })
        return
      }
    }

    if (req.body.start) {
      endConflicts = await Appointment.find({
        id: { $ne: req.params.id },
        date: req.body.date,
        user_id: req.body.user_id,
        start: { $lte: req.body.end },
        end: { $gte: req.body.end },
      })

      if (endConflicts.length > 0) {
        res.status(409).send({ error: 'Conflict with end date' })
        return
      }
    }

    if (req.body.start && req.body.end) {
      startEndConflicts = await Appointment.find({
        id: { $ne: req.params.id },
        date: req.body.date,
        user_id: req.body.user_id,
        start: { $gte: req.body.start },
        end: { $lte: req.body.end },
      })

      if (startEndConflicts.length > 0) {
        res.status(409).send({ error: 'Conflict with start and end date' })
        return
      }
    }

    next()
  }

  async validate(req, res, next) {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      res.status(400).send(errors.array())
      return
    }

    let appointment = await Appointment.findById(req.params.id)

    if (!appointment) {
      res.status(404).send({ error: 'Appointment not found' })
      return
    }

    next()
  }

  async validateFindByUser(req, res, next) {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      res.status(400).send(errors.array())
      return
    }

    let user = await User.findById(req.params.id)

    if (!user) {
      res.status(404).send({ error: 'User not found' })
      return
    }

    next()
  }
}

export default new AppointmentValidator()