const express = require('express');
const {postMusic, getAllSongs, getSongById, getSongsbyArtist, getSongbyTitle, streamSongById} = require('../controllers/music.controller');
const router = express.Router();
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      return cb (null, "./assets/music")
    },
    filename: function (req, file, cb) {
      return cb(null, `${file.originalname}`)
    }
  })
  
  const upload = multer({storage})



router.post('/upload', upload.single('music'), postMusic);
router.post('/')

router.get('/artist/:uname', getSongsbyArtist);
router.get('/all', getAllSongs);
router.get('/:id', getSongById);
router.get('/title/:title', getSongbyTitle);
router.get('/stream/:id', streamSongById)
module.exports = router;