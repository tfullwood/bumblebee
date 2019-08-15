const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const EnrollmentSchema = new Schema({
    status: {
        type: String,
        default: 'active'
    },
    dateLastModified: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: ObjectId,
        required: true
    },
    sectionId: {
        type: ObjectId,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    beginDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    associationType: {
        type: String,
        default: 'enrollment'
    }
});

EnrollmentSchema.statics = {
    get(id) {
        return this.findById(id)
            .then((enrollment) => {
                if (!enrollment) {
                    return Promise.reject({
                        message: 'Enrollment not found',
                        status: 400
                    })
                }

                return enrollment
            })
            .catch((e) => {
                return Promise.reject({
                    status: e.status || 500,
                    message: e.message || 'Internal server error',
                    stack: e.stack || ''
                })
            })
    }, //end get
    list(limit, offset, sort, orderBy, filter, fields) {
        return this.find()
            .skip(Number(offset))
            .limit(Number(limit))
            .then((enrollments) => {
                return enrollments
            })
            .catch((e) => {
                return Promise.reject({
                    message: e.message || 'Internal server error',
                    status: e.status || 500,
                    stack: e.stack
                })
            })
    }, //end list
    delete(id) {
        //TODO - add later
        //No need for it right now
    } //end delete
};

const Enrollment = mongoose.model('Enrollment', EnrollmentSchema);

module.exports = { Enrollment };