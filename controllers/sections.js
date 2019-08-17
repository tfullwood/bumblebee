const _ = require('lodash');
const ObjectId = require('mongoose').Types.ObjectId;
const { Section } = require('../models/sections');

function getSections(req, res, next) {
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

    Section.list(...params)
        .then((sections) => {
            res.json({
                educationOfferings: 
                    sections.map((section, i) => {
                        return {
                            sourcedId: section._id,
                            status: section.status,
                            dateLastModified: section.dateLastModified,
                            metadata: {}, //no reason to store anything just returning a null val
                            title: section.title,
                            offeringCode: section.offeringCode,
                            organization: {
                                href: `~/ims/eduapi/v1p0/organization/${section.organizationId}`,
                                sourcedId: section.organizationId,
                                type: 'organization'
                            },
                            academicSession: {
                                href: `~/ims/eduapi/v1p0/academicSession/${section.academicSessionId}`,
                                sourcedId: section.academicSessionId,
                                type: 'academicSession'
                            },
                            education: {
                                href: `~/ims/eduapi/v1p0/education/${section.educationId}`,
                                sourcedId: section.educationId,
                                type: 'education'
                            },
                            registrationStatus: section.registrationStatus,
                            startDate: section.startDate || undefined,
                            endDate: section.endDate || undefined,
                            offeringFormat: section.offeringFormat
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

function getSection(req, res, next) {
    if (!req.params.id || !ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            status: 'error',
            error: 'Missing or invalid sourcedId'
        })
    }
    
    Section.get(req.params.id)
        .then((section) => {
            return res.json({
                educationOffering: {
                    sourcedId: section._id,
                    status: section.status,
                    dateLastModified: section.dateLastModified,
                    metadata: {}, //no reason to store anything just returning a null val
                    title: section.title,
                    offeringCode: section.offeringCode,
                    organization: {
                        href: `~/ims/eduapi/v1p0/organization/${section.organizationId}`,
                        sourcedId: section.organizationId,
                        type: 'org'
                    },
                    academicSession: {
                        href: `~/ims/eduapi/v1p0/academicSession/${section.academicSessionId}`,
                        sourcedId: section.academicSessionId,
                        type: 'academicSession'
                    },
                    education: {
                        href: `~/ims/eduapi/v1p0/education/${section.educationId}`,
                        sourcedId: section.educationId,
                        type: 'education'
                    },
                    registrationStatus: section.registrationStatus,
                    startDate: section.startDate || undefined,
                    endDate: section.endDate || undefined,
                    offeringFormat: section.offeringFormat
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

function createSection(req, res, next) {
    var errors = [];

    if (!req.body.title) {
        errors.push('Missing required field: title');
    }
    if (!req.body.offeringCode) {
        errors.push('Missing required field: offeringCode');
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
    var section = new Section({
        title: req.body.title,
        offeringCode: req.body.offeringCode, //sis id
        educationId: req.body.educationId || ObjectId(),
        organizationId: req.body.organizationId || ObjectId(),
        academicSessionId: req.body.academicSessionId || ObjectId(), //term
        registrationStatus: req.body.registrationStatus || 'open',
        startDate: req.body.startDate || undefined,
        endDate: req.body.endDate || undefined,
        offeringFormat: req.body.offeringFormat || 'onground',
        _id: req.body._id || undefined
    });

    section.save()
        .then((section) => {
            return res.json({
                educationOffering: section
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

function updateSection(req, res, next) {
    return res.send('Not functional yet')
}

function deleteSection(req, res, next) {
    return res.send('Not functional yet')
}

module.exports = {
    getSections,
    getSection,
    createSection,
    updateSection,
    deleteSection
};