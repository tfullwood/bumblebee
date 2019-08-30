const express = require('express');
const router = express.Router();

const userController = require('../controllers/users');

router.get('/', userController.getUsers);
router.get('/:id', userController.getUser);
router.post('/', userController.createUser);

//Probably wont do these for the hackathon
// router.put('/:id', userController.updateUser);
// router.delete('/:id', userController.deleteUser);

module.exports = router;