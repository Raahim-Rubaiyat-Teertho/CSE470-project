const {connectToDb, getDb} = require("../models/db")
const {ObjectId} = require('mongodb')

connectToDb((err) => {
    db = getDb();
});


//get all posts
async function getAllPosts (req, res) {
    await db.collection('posts')
        .find()
        .toArray()
        .then(posts => {
            res.json(posts);
        })
        .catch(error => {
            console.error("Error fetching users:", error);
            res.status(500).json({ error: "Internal Server Error" });
        });
}

//get post by id
async function getPostById(req, res) {
    if (ObjectId.isValid(req.params.id)) {
        db.collection('posts')
          .findOne({ _id : new ObjectId(req.params.id)})
          .then(
            posts => {
                res.status(200).json(posts)
            }
          )
          .catch(error => {
            res.status(500).json({error : 'Document Not Found'})
          })
        } else {
          res.status(500).json({error: 'Invalid uid'})
        }
}

//get posts by uname
async function getPostsbyUname (req, res) {
    const { uname } = req.params;
    const collection = db.collection('posts');
    
    try {
        const userPosts = await collection.find({ uname }).toArray();

        if (userPosts.length > 0) {
        res.json(userPosts);
        } else {
        res.status(404).json({ message: 'No posts found for the specified uname.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

//create a post
async function createPost (req, res) {
    const post = req.body;
    await db.collection('posts')
        .insertOne(post)
        .then(
            result => {
                res.status(201).json({succes : 'Post created successfully'})
            }
        )
        .catch(
            err => {
                res.status(500).json({mssg : 'Could not create post'})
            }
        )
}

//delete post
async function deletePost(req, res) {
    if (ObjectId.isValid(req.params.id)) {
        db.collection('posts')
          .deleteOne({ _id : new ObjectId(req.params.id)})
          .then(
            result => {
                res.status(200).json({success : 'Post deleted successfully'})
            }
          )
          .catch(error => {
            res.status(500).json({error : 'Failed to delete'})
          })
        } else {
          res.status(500).json({error: 'Invalid uid'})
        }
}

async function editPost(req, res) {
    const postId = req.params.id;
    const updatedPost = req.body;

    if (ObjectId.isValid(postId)) {
        try {
            const result = await db.collection('posts')
                .updateOne({ _id: new ObjectId(postId) }, { $set: updatedPost });

            if (result.modifiedCount > 0) {
                res.status(200).json({ success: 'Post updated successfully' });
            } else {
                res.status(404).json({ error: 'Post not found' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.status(400).json({ error: 'Invalid post ID' });
    }
}


module.exports ={
    getAllPosts,
    getPostById,
    getPostsbyUname,
    createPost,
    deletePost,
    editPost
}