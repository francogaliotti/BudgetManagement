const express = require('express')
const router = express.Router()
const recordController = require('../controllers/RecordController')
//const auth = require('../middlewares/auth')

router.get('/', recordController.findAll)
router.post('/', recordController.createRecord)


module.exports = router