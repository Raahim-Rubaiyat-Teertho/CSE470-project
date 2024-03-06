const express = require('express');
const {getAllSongs, getSongsbyArtist, getSongsbyGenre, uploadSong, deleteSong} = require('../controllers/songs.controller')
const router = express.Router();

router.get('/', getAllSongs);
router.get('/artist=:artist_name', getSongsbyArtist);
//router.get('/genre=:genre', getSongsbyGenre);
router.post('/create', uploadSong);
router.delete('/delete/id=:id', deleteSong)

module.exports = router;
