import appointmentController from '../controllers/appointment.js'

const AppoinmentRouter = (router) => {
  router.route('/appointment')
    .get((req, res) => {
      res.status(200).send(appointmentController.findAll())
    })
    .post((req, res) => {
      res.status(200).send(appointmentController.post())
    })

  router.route('/appointment/:id')
    .get((req, res) => {
      res.status(200).send(appointmentController.find())
    })
    .put((req, res) => {
      res.status(200).send(appointmentController.update())
    })
    .delete((req, res) => {
      res.status(200).send(appointmentController.delete())
    })
    .post((req, res) => {
      res.status(200).send(appointmentController.findByUser())
    })
}

export default AppoinmentRouter