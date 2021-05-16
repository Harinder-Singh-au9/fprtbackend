const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()
const auth = async (req, res, next) => {
    let token = req.headers.authorization.split(' ')[1];
    console.log(token, "key", process.env.JWT_KEY)
    try {
        const user = await jwt.verify(token, process.env.JWT_KEY)
        if (user) {
            req.user = user
            next()
        } else {
            res.status(400).json({message:"not authorised"})
        }
    } catch(err) {
        res.status(500).json({message:err.message})
    }
}

module.exports = auth