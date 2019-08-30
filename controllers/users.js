const _ = require('lodash');
const ObjectId = require('mongoose').Types.ObjectId;
const { User } = require('../models/users');

function getUsers(req, res, next) {
    //TODO - add functionality for sort, orderBy, filter, and fields
        //Validate data
            //Is limit & offset an int
    const params = [
        req.query.limit || 100,
        req.query.offset || 0,
        '', //sort
        '', //orderBy
        '', //filter
        '' //fields
    ]

    User.list(...params)
        .then((users) => {
            //TODO - map this out according to whatever we decide for the persons object
            return res.json({
                persons: users
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

function getUser(req, res, next) {
    if (!req.params.id || !ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            status: 'error',
            error: 'Missing or invalid sourcedId'
        })
    }
    
    User.get(req.params.id)
        .then((user) => {
            //TODO - map this out according to whatever we decide for the persons object
            return res.json({
                person: {
                    sourcedId: user._id,
                    status: user.status,
                    dateLastModified: user.dateLastModified,
                    //not included in spec
                    givenName: user.name[0].givenName,
                    surname: user.name[0].surname,
                    username: user.username
                }
            })
        })
        .catch((e) => {
            return next({
                message: e.message,
                status: e.status,
                stack: e.stack
            })
        })
}

function createUser(req, res, next) {
    var errors = [];
    
    if (!req.body.givenName) {
        errors.push('Missing required field: givenName');
    }
    if (!req.body.surname) {
        errors.push('Missing required field: surname');
    }
    if (!req.body.username) {
        errors.push('Missing required field: username')
    }

    if (!_.isEmpty(errors)) {
        return res.status(400).json({
            status: 'error',
            error: {
                errors
            }
        })
    }

    //TODO - validate email, sanitize
        //Probably wont actually do this for the hackathon
    var user = new User({
        name: [
            {
                givenName: req.body.givenName,
                surname: req.body.surname
            }
        ],
        username: req.body.username,
        _id: req.body._id || undefined
    })

    user.save()
        .then((user) => {
            return res.json({
                person: user
            })
        })
        .catch((e) => {
            return next({
                message: e.message,
                status: e.status,
                stack: e
            })
        })
}

function updateUser(req, res, next) {
    return res.send('TODO')
}

function deleteUser(req, res, next) {
    return res.send('TODO')
}

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
};