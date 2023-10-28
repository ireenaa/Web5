const Router = require('express')
const router = new Router()

const carController = require('../controller/car.controller')
router.post( '/car', carController.createCar )
router.get( '/car', carController.getCars )
router.get( '/car/:id', carController.getOneCar )
router.put( '/car/:id', carController.updateCar )
router.delete( '/car/:id', carController.deleteCar )


module.exports = router