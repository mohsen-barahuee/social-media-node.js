const express = require("express")
const postController = require('./post.controller')
const auth = require('../../middlewares/auth')
const router = express.Router()

router.route('/').get(postController.showPostUploadView).post(auth, postController.createPost)


module.exports = router