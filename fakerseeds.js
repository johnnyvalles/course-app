const mongoose = require("mongoose");
const Person = require("./models/person");
const Assignment = require("./models/assignment");
const faker = require("faker");

const STUD_COUNT = 5,
      HW_COUNT = 5;

faker.seed(1965);

const majors = [
    "Computer Science", 
    "Computer Engineering",
    "Civil Engineering",
    "Public Health",
    "Political Science",
    "Software Engineering",
    "Informatics",
    "Bio Informatics",
    "Physics",
    "History", 
    "Geology", 
    "Sociology",
    "Psychology",
    "Chemistry"
]; 

function studentIdFromIp() {
    let id = faker.internet.ip();
    return id.split(".").join("").slice(0, 7);
}

function randomMajor() {
    return majors[Math.floor(Math.random() * 14)]; // returns a random integer from 0 to 13 ]
}

function createPerson() {
    return {
        first: faker.name.firstName(),
        last: faker.name.lastName(),
        email: faker.internet.email(),
        studentId: studentIdFromIp(),
        major: randomMajor(),
        bio: faker.lorem.sentences(7),
        img: "https://picsum.photos/400/400"
    };
}

function createAssignment() {
    return {
        name: "Homework",
        points: "100",
        released: faker.date.month() + " " + (Math.floor(Math.random() * 22) + 1),
        due: faker.date.month() + " " + (Math.floor(Math.random() * 22) + 1)
    };
}

function seedDB() {
    // Remove all People
    Person.remove({}, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Removed all people.");

            let people = [];

            for (let i = 0; i < STUD_COUNT; ++i) {
                people.push(createPerson());
            }

            people.forEach((person) => {
                Person.create(person, (err, createdPerson) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("Person added to DB.");
                    }
                });
            });
        }
    });

    // Remove all Assignments
    Assignment.remove({}, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Removed all assignments.");
            let homeworks = [];

            for (let i = 1; i < HW_COUNT; ++i) {
                let temp = createAssignment();
                temp.name += " " + String(i);
                homeworks.push(temp);
            }

            homeworks.forEach((hw) => {
                Assignment.create(hw, (err, newHw) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("Assignment added to DB.");
                    }
                })
            });
        }
    });
}
module.exports = seedDB;