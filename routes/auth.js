const express = require('express')
const router = express.Router()
const Auth = require('../controllers/auth')

router.post('/',  Auth.checkUser)

module.exports = router