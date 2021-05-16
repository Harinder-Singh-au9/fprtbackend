const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const userRouter =require("./routes/userR")
const postRouter =require("./routes/postR")
dotenv.config()

const connectDB = require("./db/connection")

connectDB()

const app = express()

app.use(express.json())
app.use(cors())
app.use("/api/user", userRouter)
app.use("/api/post",postRouter)


const PORT = process.env.PORT


app.listen(PORT, (e) => {
    if (e) throw new Error("server not connected")
    console.log("server connected")
})
