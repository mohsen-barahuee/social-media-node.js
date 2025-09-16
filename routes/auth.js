const express = require('express')
const router = express.Router()
const authController = require('../controller/auth')



router.route('/signup')
    .get(authController.signup)
    .post(authController.signUpUser)


router.route('/login')
    .get(authController.login)
    .post(authController.loginUser)

router.route('/recovery').get(authController.recovery)

module.exports = router

