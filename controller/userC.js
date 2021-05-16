const bcrypt = require("bcryptjs")
const dotenv = require("dotenv")
const User = require("../model/userModel")
const jwt = require("jsonwebtoken")

dotenv.config()

const registerUser = async (req, res) => {
    let {name,email,password} = req.body
    try {
        let user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({message:"email id already registered"})
        } else {
            let hashPWD = await bcrypt.hash(password, 10);
            user = new User({ name, email, password: hashPWD })
            user.save()
            res.json({message:"user created",user})
        }
    } catch (err) {
        res.json({message:err.message})
    }
}

const signinUser = async (req, res) => {
    let {email,password} = req.body
    try {
        let user = await User.findOne({ email })
        if (user) {
            let isValid = await bcrypt.compare(password, user.password)
            if (isValid) {
                let token = await jwt.sign({ id: user._id, name: user.name },process.env.JWT_KEY)
                res.json({message:"Login Succsess",token})
            } else {
                res.status(400).json({message:"Invalid Password"})
            }
        } else {
            res.status(400).json({message:"Invalid Email or Password"})
        }
    } catch (err) {
        res.status(500).json({message:err.message})
    }
}

module.exports = {registerUser,signinUser}