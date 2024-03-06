const {connectToDb, getDb} = require("../models/db")
const {ObjectId} = require('mongodb')

connectToDb((err) => {
    db = getDb();
});


// get songs by name
async function getAllSongs (req, res) {
    await db.collection('songs')
        .find()
        .toArray()
        .then(songs => {
            res.json(songs);
        })
        .catch(error => {
            console.error("Error fetching songs:", error);
            res.status(500).json({ error: "Internal Server Error" });
        });
};

// get songs by artists
async function getSongsbyArtist (req, res) {
    const { artist_name } = req.params;
    const collection = db.collection('songs');
    
    try {
        const songs = await collection.find({ artist_name }).toArray();

        if (songs.length > 0) {
        res.json(songs);
        } else {
        res.status(404).json({ message: 'No songs found for the specified artist name.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

// get songs by genre
async function getSongsbyGenre (req, res) {
}


// upload songs
async function uploadSong (req, res) {
    const{error} = validate(req.body);
    if (error) return res.status(400).send({message:error.details[0].message});

    const song = await Song(req.body).save();
    res.status(200).send({data: song, message: "Song uploaded lessgooooo"})
}

// delete songs
async function deleteSong (req, res) {
    await Song.findByIdandDelete(req.params.id);
    res.status(200).send({message:"Song deleted!!"})
}

module.exports ={
    getAllSongs,
    getSongsbyArtist,
    getSongsbyGenre,
    uploadSong,
    deleteSong
}