const router = require('express')
const route = router()
const controller = require('../controller/controller')
route.post('/add',controller.add)

module.exports = route