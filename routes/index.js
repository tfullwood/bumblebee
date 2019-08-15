const express = require('express');

//import routes
const userRoutes = require('./users');
const sectionRoutes = require('./sections');
const courseRoutes = require('./courses');
const enrollmentRoutes = require('./enrollments');

const router = express.Router();

//mount routes
router.use('/persons', userRoutes); //Users
router.use('/educationOfferings', sectionRoutes); //Course sections
router.use('/educations', courseRoutes); //SIS course structure not Canvas course
router.use('/offeringAssociations', enrollmentRoutes); //Enrollments

module.exports = router;