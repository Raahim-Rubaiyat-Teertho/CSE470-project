const express = require('express');
const router = express.Router();


const {getAllUsers, getUsersById, getUsersByUname, getUsersByEmail, editAccByUname} = require('../controllers/users.controller')

//get all user accounts
router.get('/', getAllUsers);

//get account by id
router.get('/:id', getUsersById);

//get account by username
router.get('/uname/:uname', getUsersByUname);

//get account by email
router.get('/email/:email', getUsersByEmail);

//edit account
router.put('/account/edit/:uname', editAccByUname);


module.exports = router;