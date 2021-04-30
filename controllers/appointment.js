class AppointmentController {
  find = (id) => {
    return 'single appointment'
  }

  findAll = () => {
    return 'all appointments'
  }

  post = (data) => {
    return 'new appointment'
  }

  update = (id) => {
    return 'update appointment'
  }

  findByUser = (user) => {
    return 'find by user'
  }

  delete = (id) => {
    return 'delete'
  }
}

export default new AppointmentController()