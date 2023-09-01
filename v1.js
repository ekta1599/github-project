const {Router} = require('express')
const v1 = Router()

const route = require('./routes/route')

v1.use('/route',route)

module.exports = v1