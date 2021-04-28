const fs = require('fs')

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.end('Hello')
  })
}