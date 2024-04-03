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





module.exports ={
    // upload, 
    postMusic
}