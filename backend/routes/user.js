const express = require('express')

// contoller functions
const {loginUser, signupUser} = require('../controller/userController')

const router = express.Router()

// login route
router.post('/login', loginUser)

// sign up route
router.post('/signup', signupUser)

module.exports = router