const express = require('express')
const router = express.Router()
const userController = require('../controller/user')
const authChecker = require('../middleware/auth')



router.route('/follow/:id')
    .post(authChecker, userController.followUser)

router.route('/user-followers')
    .get(authChecker,userController.userFollowers)


module.exports = router