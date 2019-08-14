const _ = require('lodash');
const ObjectId = require('mongoose').Types.ObjectId;
const { User } = require('../models/users');

function getUsers(req, res, next) {
    return res.send('working')
};

function getUser(req, res, next) {
    return res.send('TODO')
}

function createUser(req, res, next) {
    var errors = [];
    
    if (!req.body.firstName) {
        errors.push('Missing required field: firstName');
    }
    if (!req.body.lastName) {
        errors.push('Missing required field: lastName');
    }

    if (!_.isEmpty(errors)) {
        return res.status(400).json({
            status: 'error',
            data: {
                errors
            }
        })
    }

    //TODO - validate email, sanitize
    var user = new User({
        name: {
            firstName: req.body.firstName,
            lastName: req.body.lastName
        }
    })

    user.save()
        .then((user) => {
            return res.json({
                data: user,
                status: 'ok'
            })
        })
        .catch((e) => {
            return next({
                message: e.message,
                status: e.status,
                stack: e
            })
        })


    
        // sourcedId
        // status
        // dateLastModified
        // metadata - NA
        // name
        // address
        // contactInfo
        // demographics
        // role
        // agent
        // credentials

    
    //res.send(`this is the id ${req.params.id}`)
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