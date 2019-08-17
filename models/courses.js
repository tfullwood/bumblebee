const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const CourseSchema = new Schema({
    status: {
        type: String,
        default: 'active'
    },
    dateLastModified: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        required: true
    },
    code: { //e.g. MATH101, ENG230
        type: String,
        required: true
    },
    organizationId: {
        type: ObjectId,
        required: true
    },
    level: {
        type: String,
        default: 'undergraduate'
    },
    // meetings : [{},{}]
        //I don't need this for the hackathon
        //If decided its necessary create another table for meetings and reference the course id
    creditType: {
        type: String,
        default: 'credit'
    },
    description: {
        type: String
    },
    courseType: {
        type: String,
        default: 'course' //course, honors, lab, etc...
    },
    educationType: {
        type: String,
        default: 'course'
    },
    gradingScheme: {
        type: String,
        default: 'A:F'
    }
});

CourseSchema.statics = {
    get(id) {
        return this.findById(id)
            .then((course) => {
                if (!course) {
                    return Promise.reject({
                        message: 'Course not found',
                        status: 400
                    })
                }

                return course
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
            .then((courses) => {
                return courses
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
    }, //end delete
    dropAll() {
        console.log('hit');
        
        return this.drop()
            .then((doc) => {
                console.log('success');
                
                return 'success'
            })
            .catch((e) => {
                return Promise.reject({
                    message: e.message || 'Internal server error',
                    status: e.status || 500,
                    stack: e.stack || ''
                })
            })
    }
};

const Course = mongoose.model('Course', CourseSchema);

module.exports = { Course };