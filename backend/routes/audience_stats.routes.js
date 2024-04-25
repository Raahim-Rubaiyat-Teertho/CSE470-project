const express = require('express');
const { getAllAudienceStats, getAllAudienceStatsByUname, getUpvoteNumbers } = require('../controllers/audience_stats.controller');
const router = express.Router();

router.get('/audience', getAllAudienceStats);
router.get('/audience/:uname', getAllAudienceStatsByUname);
router.get('/audience/getUpvoteNumbers/:uname', getUpvoteNumbers);

module.exports = router;