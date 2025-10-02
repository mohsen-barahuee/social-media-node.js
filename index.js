const express = require("express")
const path = require('path')
const app = express()
require('./config/db')
require('dotenv').config({
    override: true
})
const cookieParser = require("cookie-parser")
const authRouter = require('./routes/auth')
const postRouter = require('./routes/post')
const authCheck = require('./middleware/auth')
const commentRouter = require('./routes/comment')
const userRouter = require('./routes/user')
const Posts = require('./models/post')
const UserModel = require('./models/user')
const CommentModel = require('./models/comment')


app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.use(express.static(path.join(__dirname)));



app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(express.json())


app.get('/', authCheck, async (req, res) => {

    const posts = await Posts.findAll({

        include: [
            { model: UserModel, attributes: { exclude: ['password', 'createdAt', 'updatedAt'] } },
            { model: CommentModel, attributes: ['id', 'body'], include: [{ model: UserModel, attributes: ['userName','image'] }] }
        ],
    })


    posts.map((userImage) => {
        if (userImage.User.image == null || userImage.User.image == undefined) {
            return userImage.User.image = 'http://localhost:4000/uploads/default.jpg'
        
        }
        else {
            return userImage.User.image = `http://localhost:4000/uploads/${userImage.User.image.image}`
        }
    })

   

    res.render('index', { posts })
})




app.use('/', authRouter)
app.use('/', postRouter)
app.use('/', commentRouter)
app.use('/', userRouter)

app.listen(process.env.PORT, () => {
    console.log("Server is Running on PORT " + process.env.PORT);

})