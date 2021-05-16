const express = require("express");
const {addPost,getAllpost,getUserPosts,updatePost,deletePost} = require("../controller/postC")
const router = express.Router()
const auth = require("../middleware/auth")
const fileupload= require('express-fileupload');

router.use(express.urlencoded({ extended: true }))
router.use(fileupload({
    useTempFiles: true
}));

router.post("/addpost",auth,addPost)
router.get("/getposts",auth,getAllpost)
router.get("/postbyuser",auth,getUserPosts)
router.patch("/updatepost/:id",auth,updatePost)
router.delete("/deletepost/:id",auth,deletePost)

module.exports=router