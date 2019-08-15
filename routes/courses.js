const express = require('express');
const router = express.Router();

const courseController = require('../controllers/courses');

router.get('/', courseController.getCourses);
router.get('/:id', courseController.getCourse);
router.post('/', courseController.createCourse);
//Probably wont do these for the hackathon
// router.put('/:id', userController.updateUser);
// router.delete('/:id', userController.deleteUser);

module.exports = router;