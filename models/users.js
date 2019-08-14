const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const UserSchema = new Schema({
    //sourcedId == _id
    status: {
        type: String,
        default: 'active'
    },
    dateLastModified: {
        type: Date,
        default: Date.now
    },
    //?????
    metadata: {
        type: Object
    },
    name: {
        nameType: {
            type: String,
            default: 'FULL'
        },
        language: {
            type: String,
            default: 'english'
        },
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        }
    }
});



UserSchema.statics = {
    get(id) {

    }, //end get
    list(limit, offset, sort, orderBy, filter, fields) {

    }, //end list
    delete(id) {

    } //end delete
};

const User = mongoose.model('User', UserSchema);

module.exports = { User };