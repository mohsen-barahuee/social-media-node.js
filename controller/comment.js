const Comment = require('../models/comment')
const Post = require('../models/post')
const User = require('../models/user')


exports.createComment = async (req, res) => {

    try {
        const { body } = req.body

        if (!body) {
            return res.status(400).json("Body Empty")
        }

        const comment = await Comment.create({
            body,
            userId: req.user.id,
            postId: 1
        })

        return res.status(201).json(comment)

    } catch (error) {

        console.log("ERORR===>" + error);
        return res.status(500).json("Server Error!!!")

    }

}


exports.getAllComment = async (req, res) => {

    try {

        const comments = await Comment.findAll({
            include: [
                {
                    model: User,
                    attributes: ['fullName', 'userName', 'image']
                },
                {
                    model: Post,
                    attributes: { exclude: ['updatedAt', 'createdAt', 'userId'] }
                }
            ]
        })


        return res.status(200).json(comments)

    } catch (error) {
        console.log("ERORR!!!" + error);
        return res.status(500).json("Server Error!!!")

    }

}