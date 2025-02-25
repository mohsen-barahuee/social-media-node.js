const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    media: {

        path: { type: String, required: true },
        filename: { type: String, required: true },

    },
    desription: {
        type: String,
        required: true,
    },
    hashtags: {
        type: [String]
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
})


const model = mongoose.model("Post", schema)

module.exports = model