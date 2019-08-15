const express = require('express');
const router = express.Router();

const enrollmentController = require('../controllers/enrollments');

router.get('/', enrollmentController.getEnrollments);
router.get('/:id', enrollmentController.getEnrollment);
router.post('/', enrollmentController.createEnrollment);
//Probably wont do these for the hackathon
// router.put('/:id', enrollmentController.updateEnrollment);
// router.delete('/:id', enrollmentController.deleteEnrollment);

module.exports = router;