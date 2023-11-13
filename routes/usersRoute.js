const express = require('express');
const router = express.Router();
const {
    getAllUsers,
    getUserByID,
    addUser,
    updateUser,
    deleteUser,
    loginUser,
  } = require('../controllers/usersController');

  router.post('/add', addUser);  
  router.delete('/delete/:id', deleteUser);
  router.put('/update/:id', updateUser);
  router.get('/getAll', getAllUsers);
  router.get('/get/:id', getUserByID);
  router.post('/login', loginUser);


  module.exports = router;