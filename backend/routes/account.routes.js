const express = require('express');
const { createAccount, deleteAccount } = require('../controllers/account.controller');
const router = express.Router();

//create account
router.post('/create', createAccount);

//delete account
router.delete('/:id', deleteAccount);

module.exports = router;