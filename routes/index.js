const express = require('express');

//import routes
var userRoutes = require('./users');
// var sectionRoutes = require('./sections');
// var enrollmentRoutes = require('./enrollments');

var router = express.Router();

//mount routes
router.use('/persons', userRoutes); //Users
// router.use('/educations', courseRoutes); //SIS course structure not Canvas course
// router.use('/educationOfferings', sectionRoutes); //Course sections
// router.use('/offeringAssociations', enrollmentRoutes); //Enrollments

module.exports = router;