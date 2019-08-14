const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const SectionSchema = new Schema({
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
    offeringCode: { //SIS id
        type: String,
        required: true
    },
    educationId: {
        type: ObjectId,
        required: true
    },
    orgId: {
        type: ObjectId,
        required: true
    },
    academicSessionId: {
        type: ObjectId,
        required: true
    },
    registrationStatus: {
        type: String,
        required: true
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    offeringFormat: {
        type: String,
        required: true
    }
});

SectionSchema.statics = {
    get(id) {
        return this.findById(id)
            .then((section) => {
                if (!section) {
                    return Promise.reject({
                        message: 'Section not found',
                        status: 400
                    })
                }

                return section
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
            .then((sections) => {
                return sections
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

const Section = mongoose.model('Section', SectionSchema);

module.exports = { Section };