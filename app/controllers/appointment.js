import Appointment from '../models/appointment.js'

class AppointmentController {
  async findOne(req, res, next) {
    await Appointment.findById(req.params.id, (err, result) => {
      if (err) {
        next(err)
        return
      }

      if (!result) {
        res.status(404).send({ error: 'Appointment not found' })
        return
      }

      res.status(200).send(result)
    })
  }

  async findAll(req, res, next) {
    await Appointment.find((err, result) => {
      if (err) {
        next(err)
        return
      }

      if (result.length <= 0) {
        res.status(404).send({ error: 'Appointments not found' })
        return
      }

      res.status(200).send(result)
    })
  }

  async create(req, res, next) {
    await Appointment.create(req.body, (err, result) => {
      if (err) {
        next(err)
        return
      }

      res.status(201).send({ success: 'Appointment created successfully.', data: result })
    })
  }

  async update(req, res, next) {
    await Appointment.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, result) => {
      if (err) {
        next(err)
        return
      }

      res.status(200).send({ success: 'Appointment updated successfully.', data: result })
    })
  }

  async findByUser(req, res, next) {
    await Appointment.find({ user_id: req.params.id }, (err, result) => {
      if (err) {
        next(err)
        return
      }

      if (result.length <= 0) {
        res.status(404).send({ error: 'Appointments not found' })
        return
      }

      res.status(200).send(result)
    })
  }

  async delete(req, res, next) {
    await Appointment.deleteOne({ _id: req.params.id }, (err) => {
      if (err) {
        next(err)
        return
      }
    
      res.status(200).send({ success: 'Appointment deleted successfully.' })
    })
  }
}

export default new AppointmentController()