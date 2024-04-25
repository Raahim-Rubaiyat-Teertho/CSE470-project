const express = require('express');
const { getAllArtistStats, getAllArtistStatsByUname, getUpvoteNumbers } = require('../controllers/artist_stats.controller');
const router = express.Router();

router.get('/', getAllArtistStats);
router.get('/:uname', getAllArtistStatsByUname);
router.get('/getUpvoteNumbers/:uname', getUpvoteNumbers);

module.exports = router;