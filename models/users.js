const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const UserSchema = new Schema({
    //TODO - finish updating this schema - will need to update to test effectively against multiple use cases
        //Also need to build out some additional endpoints for things in subarrays - e.g. additional names, addresses, agents, etc...
    //Remaining fields
    //addresses = [{addressType, address1,2,3,4, city, state, zip, country}], contactInfo = [{type, info}], demographics = {dob, setMaxListeners, countryofBirth, cityOfBirth}, schoolDemograhics = {roles[<list of roles here>]}, agent = [{type, language, id (fk to agent table id), description}]
    status: {
        type: String,
        default: 'active'
    },
    dateLastModified: {
        type: Date,
        default: Date.now
    },
    name: [
        {
            language: {
                type: String,
                default: 'english'
            },
            givenName: {
                type: String,
                required: true
            },
            surname: {
                type: String,
                required: true
            }
        }
    ],
    username: {
        type: String,
        required: true
    },
    password: {
        type: String
    }

});
//if empty array is needed in db add - replace above close with this
    //}, { minimize: false });


//body param requirements
    //firstName, lastName, username
    //secondary requirements if I finish things
        //address1, address2, city, state, country, zip, role, roleOrgUrl, roleOrgSourcedId,

UserSchema.statics = {
    get(id) {
        return this.findById(id)
            .then((user) => {
                if (!user) {
                    return Promise.reject({
                        message: 'User not found',
                        status: 400
                    })
                }

                return user
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
            .then((users) => {
                return users
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

const User = mongoose.model('User', UserSchema);

module.exports = { User };