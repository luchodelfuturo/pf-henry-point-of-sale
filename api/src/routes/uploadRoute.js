const router = require('express').Router()
const uploadImage = require('../middleware/uploadImage')
const uploadCtrl = require('../controllers/upload')
const auth = require('../middleware/auth')

router.post('/', uploadImage, auth, uploadCtrl.uploadAvatar)

module.exports = router