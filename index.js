const express = require("express")
const path = require('path')
const app = express()
require('./config/db')
require('dotenv').config({
    override: true
})
const cookieParser = require("cookie-parser")
const authRouter = require('./routes/auth')



app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.use(express.static(path.join(__dirname)));



app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(express.json())


app.get('/', async (req, res) => {
    res.render('index')
})

app.use('/', authRouter)


app.listen(process.env.PORT, () => {
    console.log("Server is Running on PORT " + process.env.PORT);

})