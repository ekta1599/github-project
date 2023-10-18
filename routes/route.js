const router = require('express')
const route = router()
const controller = require('../controller/controller')

route.post('/add',controller.add)
route.put("/update/:_id", controller.update)
route.delete('/delete/:_id', controller.delete)
route.get('/getbyId/:_id',controller.byId)
route.get('/getAll',controller.getAll)
module.exports = route