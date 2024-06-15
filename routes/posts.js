const express = require("express");
const {getPosts,createPosts,updatePost,likePost,deletePost} = require("../controller/posts.js")
const router = express.Router();

const {auth} = require("../middleware/auth.js");



router.get('/',getPosts)
router.post('/',auth, createPosts); 
router.patch('/:id',auth, updatePost);
router.delete('/:id', deletePost);
router.patch('/:id/likePost', likePost);


module.exports = router;