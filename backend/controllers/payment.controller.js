const express = require('express');
const router = express.Router();

async function paymentSuccess(req, res) {
    // res.send({status: 'success', transaction_id: req.params.tid});
    res.redirect(`http://localhost:3000/paid/${req.params.tid}`)
}

async function paymentFailed(req, res) {
    res.send({status: 'failed', transaction_id: req.params.tid})
}

module.exports = {
    paymentSuccess,
    paymentFailed
}