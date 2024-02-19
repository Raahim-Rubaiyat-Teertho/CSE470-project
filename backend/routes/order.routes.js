const express = require('express');
const router = express.Router();

const { orderPaymentGateway } = require("../controllers/order.controller");

// subscription related code
router.post("/", orderPaymentGateway);

module.exports = router;