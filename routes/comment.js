const express = require('express')
const router = express.Router()
const commentController = require('../controller/comment');
const authCheck = require('../middleware/auth');

router.route('/create-comment')
    .post(authCheck, commentController.createComment);

router.route('/comments')
    .get(commentController.getAllComment)

module.exports = router;