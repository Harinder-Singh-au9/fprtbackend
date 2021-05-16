const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required:true,
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true,
        minLength:5
    },
    date: {
        type: Date,
        default:Date.now()
    }
    
}, { timestamps: true })

const User = mongoose.model('User', userSchema)

module.exports = User;