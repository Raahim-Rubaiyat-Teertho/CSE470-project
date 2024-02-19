const express = require('express');
const { paymentSuccess, paymentFailed } = require('../controllers/payment.controller');
const router = express.Router();

router.post("/success/:tid", paymentSuccess)
  
router.post("/fail/:tid", paymentFailed)

module.exports = router;