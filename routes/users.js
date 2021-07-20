const express = require('express')

const User = require('../models/user')
const Auth = require('../controllers/auth')

const router = express.Router()

//middleware de auth
router.use(async(req, res, next) => {
    Auth.checkRole(req, res, next, 'admin')
})

router.get('/', async(req, res) => {
    const users = await User.find()
    res.send(users)
})


module.exports = router

