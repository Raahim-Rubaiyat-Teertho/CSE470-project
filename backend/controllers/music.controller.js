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
        path: req.file.path
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

// get songs by artist name
async function getSongsbyArtist(req, res) {
    const { uname } = req.params;
    const collection = db.collection('songs');
    
    try {
        const userSongs = await collection.find({ uname }).toArray();
        res.json(userSongs);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
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


module.exports ={
    // upload, 
    postMusic,
    getAllSongs,
    getSongById,
    getSongsbyArtist,
    getSongbyTitle
}