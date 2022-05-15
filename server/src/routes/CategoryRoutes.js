const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/CategoryController')
const auth = require('../middlewares/auth')

router.get('/:type', auth, categoryController.findCategories)



module.exports = router