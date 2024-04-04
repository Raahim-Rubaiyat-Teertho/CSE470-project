const express = require('express');
const {postMusic, getAllSongs, getSongById, getSongsbyArtist, getSongbyTitle} = require('../controllers/music.controller');
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

router.get('/all', getAllSongs);
router.get('/:id', getSongById);
router.get('/:uname', getSongsbyArtist);
router.get('/:title', getSongbyTitle);

module.exports = router;