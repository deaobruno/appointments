import User from '../models/user.js'

class UserController {
  async findOne(req, res, next) {
    await User.findById(req.params.id, (err, result) => {
      if (err) {
        next(err)
        return
      }

      if (!result) {
        next(new Error('User not found'))
        return
      }

      res.status(200).send(result)
    })
  }

  async findAll(req, res, next) {
    await User.find((err, result) => {
      if (err) {
        next(err)
        return
      }

      if (result.length <= 0) {
        next(new Error('Users not found'))
        return
      }

      res.status(200).send(result)
    })
  }

  async create(req, res, next) {
    await User.create(req.body, (err, user) => {
      if (err) {
        next(err)
        return
      }

      res.status(201).send({ success: 'User created successfully', data: user })
    })
  }

  async update(req, res, next) {
    await User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, result) => {
      if (err) {
        next(err)
        return
      }

      res.status(200).send({ success: 'User updated successfully', data: result })
    })
  }

  async delete(req, res, next) {
    await User.deleteOne({ _id: req.params.id }, (err) => {
      if (err) {
        next(err)
        return
      }
    
      res.status(200).send({ success: 'User deleted successfully' })
    })
  }
}

export default new UserController()