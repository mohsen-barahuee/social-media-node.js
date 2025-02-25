const postModel = require('../../models/Post')



exports.showPostUploadView = async (req, res) => {
    return res.render('post/upload.ejs')
}


exports.createPost = async (req, res) => {

}