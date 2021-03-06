const express = require('express')
const router = express.Router()
const recordController = require('../controllers/RecordController')
const auth = require('../middlewares/auth')

router.get('/', auth, recordController.findAll)
router.get('/type/:type', auth, recordController.findByType)
router.get('/category/:id', auth, recordController.findByCategory)
router.post('/', auth, recordController.createRecord)
router.get('/:id', auth, recordController.getRecordById)
router.put('/:id', auth, recordController.updateRecord)
router.delete('/:id', auth, recordController.deleteRecord)


module.exports = router