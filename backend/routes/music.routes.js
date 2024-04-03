const express = require('express');
const {postMusic} = require('../controllers/music.controller');
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
module.exports = router;