const {connectToDb, getDb} = require("../models/db")
const multer = require('multer');

connectToDb((err) => {
    db = getDb();
});

const {ObjectId} = require('mongodb')

// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         return cb(null, "../assets/music")
//     },
//     filename : function(req, file, cb) {
//         return cb(null, `${file.originalname}`)
//     }
// })

// const upload = multer({storage})

async function postMusic (req, res) {
    console.log(req.body)
    console.log(req.file)

    const post ={
        uname: req.body.uname,
        title: req.body.title,
        song_name: req.file.originalname,
        path: req.file.path,
        upvotes: 0,
        upvoted_by: []
    }
    await db.collection('songs')
        .insertOne(post)
        .then(
            result => {
                res.status(201).json({success : 'Post created successfully'})
            }
        )
        .catch(
            err => {
                res.status(500).json({mssg : 'Could not create post'})
            }
        )

}

async function getAllSongs (req, res) {
    db.collection('songs')
      .find()
      .toArray()
      .then(
        songs => {
            res.status(200).json(songs)
        }
      )
      .catch(
        error => {
            res.status(500).json({error : 'Could not find songs'})
        }
      )

}

// get songs by artist name
async function getSongsbyArtist (req, res) {
    const { uname } = req.params;
    const collection = db.collection('songs');
    console.log('req')
    
    try {
        const userSongs = await collection.find({ uname }).toArray();

        if (userSongs.length > 0) {
        res.json(userSongs);
        } else {
        res.status(404).json({ message: 'No posts found for the specified uname.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

// get songs by id
async function getSongById(req, res) {
    if (ObjectId.isValid(req.params.id)) {
        db.collection('songs')
        .findOne({_id: new ObjectId(req.params.id)})
        .then(
            song => {
                res.status(200).json(song)
            }
        )
        .catch(
            error => {
                res.status(500).json({error : 'Could not find song'})
            }
        )
        }
}



async function getSongbyTitle (req, res) {
    db.collection('songs')
      .findOne({title : req.params.title}) // Changed to findOne
      .then(
        song => {
            res.status(200).json(song) // Changed to json(song) instead of json(songs)
        }
      )
      .catch(
        error => {
            res.status(500).json({error : 'Could not find song'})
        }
      )
}


const fs = require('fs');

// Modify your getSongById function to stream the audio file
async function streamSongById(req, res) {
    if (ObjectId.isValid(req.params.id)) {
        const song = await db.collection('songs').findOne({_id: new ObjectId(req.params.id)});
        if (song) {
            const path = song.path; // Get the path to the audio file from the database
            const stat = fs.statSync(path);
            const fileSize = stat.size;
            const range = req.headers.range;

            if (range) {
                const parts = range.replace(/bytes=/, '').split('-');
                const start = parseInt(parts[0], 10);
                const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
                const chunkSize = (end - start) + 1;
                const file = fs.createReadStream(path, { start, end });
                const headers = {
                    'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                    'Accept-Ranges': 'bytes',
                    'Content-Length': chunkSize,
                    'Content-Type': 'audio/mpeg',
                };
                res.writeHead(206, headers);
                file.pipe(res);
            } else {
                const headers = {
                    'Content-Type': 'audio/mpeg',
                    'Content-Length': fileSize,
                };
                res.writeHead(200, headers);
                fs.createReadStream(path).pipe(res);
            }
        } else {
            res.status(404).json({ error: 'Song not found' });
        }
    } else {
        res.status(400).json({ error: 'Invalid song ID' });
    }
}

async function upvotePost(req, res) {
    const postId = req.params.id;
    const { uname } = req.body;

    // Check if the post ID is valid
    if (!ObjectId.isValid(postId)) {
        return res.status(400).json({ error: 'Invalid post ID' });
    }

    // Get the database instance
    const db = getDb();

    try {
        // Find the post by its ID
        const post = await db.collection('songs').findOne({ _id: new ObjectId(postId) });

        // Check if the post exists
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        // Check if the user has already upvoted the post
        if (post.upvoted_by.includes(uname)) {
            // User already upvoted, so remove their upvote
            const result = await db.collection('songs').updateOne(
                { _id: new ObjectId(postId) },
                { $inc: { upvotes: -1 }, $pull: { upvoted_by: uname } }
            );
            if (result.modifiedCount === 0) {
                return res.status(500).json({ error: 'Failed to remove upvote' });
            }
        } else {
            // User hasn't upvoted, so add their upvote
            const result = await db.collection('songs').updateOne(
                { _id: new ObjectId(postId) },
                { $inc: { upvotes: 1 }, $push: { upvoted_by: uname } }
            );
            if (result.modifiedCount === 0) {
                return res.status(500).json({ error: 'Failed to add upvote' });
            }
        }

        // Return success response
        return res.status(200).json({ success: 'Upvote toggled successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}


module.exports ={
    // upload, 
    postMusic,
    getAllSongs,
    getSongById,
    getSongsbyArtist,
    getSongbyTitle,
    streamSongById,
    upvotePost
}