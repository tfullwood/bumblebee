require('dotenv').config();
const axios = require('axios');
const csv = require('fast-csv');
var fs = require('fs');

//Manually drop the collections before - too lazy to write endpoints to drop all
//Order = courses -> sections -> users -> enrollments

//Create courses
writeCourses = async () => {
    fs.createReadStream(`${process.env.LOCAL_PATH}/seed/data/courses.csv`)
        .pipe(csv.parse({ headers: false }))
        .on('data', (row) => {
            setTimeout(function() {
                let res = makeReq('educations', {
                    code: row[0],
                    title: row[1],
                    _id: row[2]
                });
            }, 1500);

            console.log(`Writing Course: ${row[1]}`);
        })
        .on('end', () => {
            writeSections()
        })
}

//Create sections
writeSections = async () => {
    fs.createReadStream(`${process.env.LOCAL_PATH}/seed/data/sections.csv`)
        .pipe(csv.parse({ headers: false }))
        .on('data', (row) => {
            setTimeout(function() {
                let res = makeReq('educationOfferings', {
                    title: row[0],
                    offeringCode: row[1], //sis id
                    educationId: row[2], //course
                    organizationId: row[3], //school
                    academicSessionId: row[4], //term
                    _id: row[5] //sourcedId
                });
            }, 1500);

            console.log(`Writing Section: ${row[0]}`);
        })
        .on('end', () => {
            writeUsers()
        })
}

//Create Users
writeUsers = async () => {
    fs.createReadStream(`${process.env.LOCAL_PATH}/seed/data/users.csv`)
        .pipe(csv.parse({ headers: false }))
        .on('data', (row) => {
            setTimeout(function() {
                let res = makeReq('persons', {
                    givenName: row[1], //sis id
                    surname: row[2], //course
                    username: row[3], //school
                    _id: row[4] //sourcedId
                })
            }, 1500);
            
            console.log(`Writing User: ${row[1]} ${row[2]}`);
        })
        .on('end', () => {
            writeEnrollments()
        })
}

//Create Enrollments
writeEnrollments = async () => {
    fs.createReadStream(`${process.env.LOCAL_PATH}/seed/data/enrollments.csv`)
        .pipe(csv.parse({ headers: false }))
        .on('data', (row) => {
            setTimeout(function() {
                let res = makeReq('offeringAssociations', {
                    userId: row[0],
                    sectionId: row[1],
                    role: row[2]
                })
            }, 1500);

            console.log(`Writing Enrollment: user: ${row[0]} in section: ${row[1]}`);
        })
        .on('end', () => {
            console.log('end');
        })
}

//Make actual request to server - requires data in .env so this needs to be kicked off from the root of the project
makeReq = async (endpoint, data) => {
    try {
        await axios.post(`${process.env.HOST_PATH}:${process.env.PORT}/ims/eduapi/v1p0/${endpoint}`, data, {
            headers: {}
        })
    }
    catch (e) {
        console.log(e);
    }
}

//Kick off the process
writeCourses()