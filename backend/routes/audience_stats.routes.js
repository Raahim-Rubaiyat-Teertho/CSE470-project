const express = require('express');
const { getAllAudienceStats, getAllAudienceStatsByUname, getUpvoteNumbers } = require('../controllers/audience_stats.controller');
const router = express.Router();

router.get('/', getAllAudienceStats);
router.get('/:uname', getAllAudienceStatsByUname);
router.get('/getUpvoteNumbers/:uname', getUpvoteNumbers);

module.exports = router;