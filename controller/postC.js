const Post = require("../model/postModel");
const dotenv = require("dotenv")
dotenv.config()
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
  });


const addPost = async (req, res) => {
  let { title, description, is_private } = req.body;
  let img=req.files.image
  let { id } = req.user;


  try {

    cloudinary.uploader.upload(img.tempFilePath, async (err, result)=> { 
      if(err) throw err;
    const post = new Post({ title, description, image_by: id, is_private,image_url:result.url});
    await post.save();
      res.json({ message: "post created", post });
    })
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllpost = async (req, res) => {
  try {
    const posts = await Post.find({});
    if (posts) {
      res.json({ message: posts });
    } else {
      res.json({ message: "No Post Available" });
    }
  } catch (err) {
    res.status(500).json({ message: "server issue" });
  }
};

const getUserPosts = async (req, res) => {
  const { id } = req.user;
  try {
    const posts = await Post.find({ image_by: id });
    if (posts) {
      res.json({ message: posts });
    } else {
      res.json({ message: "No Post Available" });
    }
  } catch (err) {
    res.status(500).json({ message: "server issue" });
  }
};

const updatePost = async (req, res) => {
  let { title, description, is_private } = req.body;
  let { id } = req.user;
  let post_id = req.params.id;

  try {
      let post = await Post.findById(post_id);
    if (post) {
      post.title = title;
      post.description = description;
      post.is_private = is_private;
      await post.save();
    } else {
      res.status(400).json({ message: "post not available" });
    }
    res.json({ message: "post updated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deletePost = async (req, res) => {
    const id = req.params.id
    try {
        const post = await Post.findById(id)
        await post.delete()
        res.json({message:"deleted successfully"})
    } catch (err) {
        res.json({message:err.message})
    }
}
module.exports = { addPost, getAllpost, getUserPosts, updatePost,deletePost };
