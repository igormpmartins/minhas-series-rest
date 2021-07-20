const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const jwtSecret = process.env.SECRET || 'abc123456789abc'

//middleware de auth
const checkRole = async(req, res, next, role) => {

    const token = req.headers['x-access-token'] || req.body.token || req.query.token 
    let success = false

    if (token) {

        const payload = jwt.verify(token, jwtSecret)

        if (payload.roles.indexOf(role)>=0) {
            success = true
            next()
        }

    }

    if (!success) {
        res.send({
            success: false
        })
    }

}

const checkUser = async(req, res) => {
    const user = req.body

    const userDB = await User.findOne({username: user.username})

    if (userDB && userDB.password == user.password) { 
        const payload = {
            id: userDB._id,
            username: userDB.username,
            roles: userDB.roles
        }

        jwt.sign(payload, jwtSecret, (err, token) => {
            res.send({
                success: true,
                token
            })
        })
        
    } else {
        res.send({
            success: false,
            message: 'wrong auth'
        })
    }
}

const checkInitUsers = async() => {

    const tot = await User.countDocuments({})

    if (tot === 0) {
        const usu1 = new User({
            username: 'igor',
            password: '1234',
            roles: ['admin', 'restrito']
        })
        await usu1.save()

        const usu2 = new User({
            username: 'guest',
            password: '1234',
            roles: ['restrito']
        })
        await usu2.save()

    }

}

module.exports =  {
    checkRole, checkUser, checkInitUsers
}

