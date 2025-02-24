const express = require("express")
const path = require('path')
const app = express()
const { setHeaders } = require("./middlewares/headers")
const { errorHandler } = require("./middlewares/errorHandler")



// Body Parser
app.use(express.urlencoded({ limit: "50mb", extended: true }))
app.use(express.json({ limit: "50mb" }))

// Cors Policy
app.use(setHeaders)

// Static Folder
app.use(express.static(path.join(__dirname, '..', 'public')))
app.use("/css", express.static(path.join(__dirname, 'public/css')))
app.use("/js", express.static(path.join(__dirname, 'public/js')))
app.use("/fonts", express.static(path.join(__dirname, 'public/fonts')))
app.use("/images", express.static(path.join(__dirname, 'public/images')))





// Template Engine
app.set("view engine", 'ejs')
app.set("views", path.join(__dirname, "views"))



// Routes
app.get("/", (req, res) => {
    return res.render('index')
})




// 404 Error Handler

app.use((req, res) => {

    console.log("this is path is not found : ", req.path)
    return res.status(404).json({ message: "Not Found 404!!" })
})



// !Needed Feature
// app.use(errorHandler)


module.exports = app