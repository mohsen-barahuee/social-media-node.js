const app = require('./app')


function startServer() {
    app.listen(4002, () => {
        console.log("Server is runing on port 4002")
    })
}

function run() {
    startServer()
}

run()