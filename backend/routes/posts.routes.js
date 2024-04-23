const express = require('express');
const {getAllPosts, getPostById, getPostsbyUname, createPost, deletePost, editPost, upvotePost} = require('../controllers/posts.controller')
const router = express.Router();

router.get('/', getAllPosts);
router.get('/id=:id', getPostById);
router.get('/:uname', getPostsbyUname);
router.post('/create', createPost);
router.delete('/delete/id=:id', deletePost);
router.put('/edit/id=:id', editPost);
router.put('/:id/upvote', upvotePost);

module.exports = router;