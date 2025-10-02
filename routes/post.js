const express = require('express')
const router = express.Router()
const postController = require('../controller/post')
const upload = require('../middleware/upload')
const authCheck = require('../middleware/auth')


router.route('/post-upload')
    .get(postController.page)
    .post(upload.single("image"), authCheck, postController.uploadPost)

router.route('/posts').get(postController.getAllPosts)


module.exports = router