import {body, param, validationResult} from 'express-validator';
import {User} from '../models/user.js';

class UserValidator {
  constructor() {
    this.idRules = [
      param('id').notEmpty()
        .withMessage('Missing attribute')
        .trim()
        .escape()
        .isMongoId()
        .withMessage('Wrong format'),
    ];

    this.createRules = [
      body('name').notEmpty()
        .withMessage('Missing attribute')
        .trim()
        .escape(),
    ];

    this.updateRules = [
      param('id').notEmpty()
        .withMessage('Missing attribute')
        .trim()
        .escape()
        .isMongoId()
        .withMessage('Wrong format'),

      body('name').notEmpty()
        .withMessage('Missing attribute')
        .trim()
        .escape(),
    ];
  }

  async validateCreate(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).send(errors.array());
      return;
    }

    let user = await User.findOne(req.body);

    if (user) {
      res.status(409).send({error: 'User already registered'});
      return;
    }

    next();
  }

  async validate(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).send(errors.array());
      return;
    }

    let user = await User.findById(req.params.id);

    if (!user) {
      res.status(404).send({error: 'User not found'});
      return;
    }

    next();
  }
}

export {UserValidator};