const Comment = require('../models/comment')
const Post = require('../models/post')
const User = require('../models/user')


exports.createComment = async (req, res) => {

    try {
        //get comment body from req
        const { body } = req.body

        //check body has data or not
        if (!body) {
            return res.status(400).json("Body Empty")
        }

        //create a comment
        const comment = await Comment.create({
            body,
            userId: req.user.id,
            postId: 2
        })

        //send the response
        return res.status(201).json(comment)

    } catch (error) {

        //error handling
        console.log("ERORR===>" + error);
        return res.status(500).json("Server Error!!!")

    }
}
exports.getAllComment = async (req, res) => {

    try {
        //get all comments from db
        const comments = await Comment.findAll({
            include: [
                { model: User, attributes: ['fullName', 'userName', 'image'] },
                { model: Post, attributes: { exclude: ['updatedAt', 'createdAt', 'userId'] } }
            ]
        })
        return res.status(200).json(comments)

    } catch (error) {
        console.log("ERORR!!!" + error);
        return res.status(500).json("Server Error!!!")

    }

}