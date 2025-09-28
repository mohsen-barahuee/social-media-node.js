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

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.use(express.static(path.join(__dirname)));



app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(express.json())


app.get('/', authCheck, async (req, res) => {
    res.render('index')
})


app.get('/user',async (req,res)=>{
    res.render('pages/profile/singleProfile/index')
})

app.use('/', authRouter)
app.use('/', postRouter)
app.use('/', commentRouter)
app.use('/',userRouter)

app.listen(process.env.PORT, () => {
    console.log("Server is Running on PORT " + process.env.PORT);

})