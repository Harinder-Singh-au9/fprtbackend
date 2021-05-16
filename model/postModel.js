const mongoose = require("mongoose")
const postSchema = mongoose.Schema({
    title: {
        type: String,
        required:true
    },
    description: {
        type: String,
        required:true,
    },
    image_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
    },
    is_private: {
        type: Boolean,
        required:true,
        default :true
    },
    image_url: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default:Date.now()
    }

}, { timestamps: true })

const Post = mongoose.model('Post', postSchema)
module.exports = Post;