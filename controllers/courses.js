const _ = require('lodash');
const ObjectId = require('mongoose').Types.ObjectId;
const { Course } = require('../models/courses');

function getCourses(req, res, next) {
    //TODO - add functionality for sort, orderBy, filter, and fields
        //Validate data
            //Is limit & offset a num
    const params = [
        req.query.limit || 100,
        req.query.offset || 0,
        '', //sort
        '', //orderBy
        '', //filter
        '' //fields
    ];

    Course.list(...params)
        .then((courses) => {
            res.json({
                educations: 
                    courses.map((course, i) => {
                        return {
                            sourcedId: course._id,
                            status: course.status,
                            dateLastModified: course.dateLastModified,
                            metadata: {}, //no need for it now just adding it to match spec
                            title: course.title,
                            code: course.code,
                            organization: {
                                href: `~/ims/eduapi/v1p0/organization/${course.organizationId}`,
                                sourcedId: course.organizationId,
                                type: 'organization'
                            },
                            level: course.level,
                            meetings: [], //may need to add later but just adding empty arr to match spec
                            creditType: course.creditType,
                            educationType: course.educationType,
                            gradingScheme: course.gradingScheme
                        }
                    })
            })
        })
        .catch((e) => {
            return next({
                message: e.message,
                status: e.status,
                stack: e.stack
            })
        })
};

function getCourse(req, res, next) {
    if (!req.params.id || !ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            status: 'error',
            error: 'Missing or invalid sourcedId'
        })
    }
    
    Course.get(req.params.id)
        .then((course) => {
            return res.json({
                education: {
                    sourcedId: course._id,
                    status: course.status,
                    dateLastModified: course.dateLastModified,
                    metadata: {}, //no need for it now just adding it to match spec
                    title: course.title,
                    code: course.code,
                    organization: {
                        href: `~/ims/eduapi/v1p0/organization/${course.organizationId}`,
                        sourcedId: course.organizationId,
                        type: 'organization'
                    },
                    level: course.level,
                    meetings: [], //may need to add later but just adding empty arr to match spec
                    creditType: course.creditType,
                    educationType: course.educationType,
                    gradingScheme: course.gradingScheme
                }
            })
        })
        .catch((e) => {
            return next({
                message: e.message,
                status: e.status,
                stack: e.stack
            })
        });
}

function createCourse(req, res, next) {
    var errors = [];

    if (!req.body.title) {
        errors.push('Missing required field: title');
    }
    if (!req.body.code) {
        errors.push('Missing required field: code');
    }

    if (!_.isEmpty(errors)) {
        return res.status(400).json({
            status: 'error',
            error: {
                errors
            }
        })
    }

    //TODO - sanitize
        //Probably wont actually do this for the hackathon
    var course = new Course({
        title: req.body.title,
        code: req.body.code,
        organizationId: ObjectId(),
        status: req.body.status || undefined,
        level: req.body.level || undefined,
        creditType: req.body.creditType || undefined,
        description: req.body.description || undefined,
        courseType: req.body.courseType || undefined,
        educationType: req.body.educationType || undefined,
        gradingScheme: req.body.gradingScheme || undefined,
        _id: req.body._id || undefined
    });

    course.save()
        .then((course) => {
            return res.json({
                education: course
            })
        })
        .catch((e) => {
            return next({
                message: e.message,
                status: e.status,
                stack: e
            })
        });
}

// function updateCourse(req, res, next) {
//     return res.send('Not functional yet')
// }

// function deleteCourse(req, res, next) {
//     return res.send('Not functional yet')
// }

module.exports = {
    getCourses,
    getCourse,
    createCourse,
    // updateCourse,
    // deleteCourse
};