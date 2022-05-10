const express = require('express')
const router = express.Router()
const recordController = require('../controllers/RecordController')
//const auth = require('../middlewares/auth')

router.get('/', recordController.findAll)
router.post('/', recordController.createRecord)
router.get('/:id', recordController.getRecordById)
router.put('/:id', recordController.updateRecord)
router.delete('/:id', recordController.deleteRecord)


module.exports = router