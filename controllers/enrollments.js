const _ = require('lodash');
const ObjectId = require('mongoose').Types.ObjectId;
const { Enrollment } = require('../models/enrollments');

function getEnrollments(req, res, next) {
    //TODO - add functionality for sort, orderBy, filter, and fields
        //Validate data
            //Is limit & offset a num
    const params = [
        req.body.limit || 100,
        req.body.offset || 0,
        '', //sort
        '', //orderBy
        '', //filter
        '' //fields
    ];

    Enrollment.list(...params)
        .then((enrollments) => {
            res.json({
                offeringAssociations: 
                    enrollments.map((enrollment, i) => {
                        return {
                            sourcedId: enrollment._id,
                            status: enrollment.status,
                            dateLastModified: enrollment.dateLastModified,
                            metadata: {}, //add later if needed
                            personId: {
                                href: `~/ims/eduapi/v1p0/persons/${enrollment.userId}`,
                                sourcedId: enrollment.userId,
                                type: 'person'
                            },
                            educationOfferingId: {
                                href: `~/ims/eduapi/v1p0/educationOfferings/${enrollment.sectionId}`,
                                sourcedId: enrollment.sectionId,
                                type: 'educationOffering'
                            },
                            role: enrollment.role,
                            beginDate: enrollment.beginDate,
                            endDate: enrollment.endDate,
                            associationType: enrollment.associationType
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

function getEnrollment(req, res, next) {
    if (!req.params.id || !ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            status: 'error',
            error: 'Missing or invalid sourcedId'
        })
    }
    
    Enrollment.get(req.params.id)
        .then((enrollment) => {
            return res.json({
                offeringAssociation: {
                    sourcedId: enrollment._id,
                    status: enrollment.status,
                    dateLastModified: enrollment.dateLastModified,
                    metadata: {}, //add later if needed
                    personId: {
                        href: `~/ims/eduapi/v1p0/persons/${enrollment.userId}`,
                        sourcedId: enrollment.userId,
                        type: 'person'
                    },
                    educationOfferingId: {
                        href: `~/ims/eduapi/v1p0/educationOfferings/${enrollment.sectionId}`,
                        sourcedId: enrollment.sectionId,
                        type: 'educationOffering'
                    },
                    role: enrollment.role,
                    beginDate: enrollment.beginDate,
                    endDate: enrollment.endDate,
                    associationType: enrollment.associationType
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

function createEnrollment(req, res, next) {
    var errors = [];

    if (!req.body.userId) {
        errors.push('Missing required field: userId');
    }
    if (!req.body.sectionId) {
        errors.push('Missing required field: sectionId');
    }
    if (!req.body.role) {
        errors.push('Missing required field: role');
    }
    
    if (!_.isEmpty(errors)) {
        return res.status(400).json({
            status: 'error',
            error: {
                errors
            }
        })
    }

    //TODO - sanitize, validate
        //Probably wont actually do this for the hackathon
        //Note I don't check that the reference ids actually exist, e.g. no clue if a user/section actually exist for the enrollment
    var enrollment = new Enrollment({
        userId: req.body.userId || ObjectId(), //the object ids here are just for testing - it'll throw errors when pushed to canvas
        sectionId: req.body.sectionId || ObjectId(), //same ^^
        role: req.body.role,
        status: req.body.status || undefined,
        beginDate: req.body.beginDate || undefined,
        endDate: req.body.endDate || undefined
    });

    enrollment.save()
        .then((enrollment) => {
            return res.json({
                offeringAssociation: enrollment
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

// function updateEnrollment(req, res, next) {
//     return res.send('Not functional yet')
// }

// function deleteEnrollment(req, res, next) {
//     return res.send('Not functional yet')
// }

module.exports = {
    getEnrollments,
    getEnrollment,
    createEnrollment,
    // updateEnrollment,
    // deleteEnrollment
};