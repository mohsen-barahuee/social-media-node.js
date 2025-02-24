const app = require('./app')
const mongoose = require("mongoose")
const dotenv = require('dotenv')


// Load ENV
const productionMode = process.env.NODE_ENV === "production"
if (!productionMode) {
    dotenv.config()
}

async function connectToDB() {

    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB connected : ${mongoose.connection.host} `);
    }
    catch (err) {
        console.log("Error in DB connection ->", err);
        process.exit(1)

    }
}

function startServer() {

    const port = process.env.PORT || 4002
    app.listen(port, () => {
        console.log(`Server is runing on ${port}`)
    })
    connectToDB()
}

function run() {
    startServer()
}

run()