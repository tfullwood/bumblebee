const express = require('express');
const router = express.Router();

const userController = require('../controllers/users');

router.get('/', userController.getUsers);
router.get('/:id', userController.getUser);
//On create I'll use the mongo created _id as the sourcedid
// router.post('/:id', userController.createUser);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;