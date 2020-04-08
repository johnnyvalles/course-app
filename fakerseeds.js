const mongoose = require("mongoose");
const Student = require("./models/person");
const Assignment = require("./models/assignment");
const faker = require("faker");

const STUD_COUNT = 3,
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

function studentIdFromPhone(phone) {
    return phone.split("-").join("").slice(0, 7);
}

function randomMajor() {
    return majors[Math.floor(Math.random() * 14)]; // returns a random integer from 0 to 13 ]
}

function createStudent() {
    let card = faker.helpers.contextualCard();
    let user = {
        first: card.name,
        last: faker.name.lastName(),
        email: card.email,
        studentId: studentIdFromPhone(faker.phone.phoneNumberFormat()),
        major: randomMajor(),
        bio: faker.lorem.sentences(7),
        img: card.avatar,
    };
    user.username = (user.first + user.last).toLowerCase();
    return user;
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
    Student.remove({}, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Removed all people.");

            let people = [];

            for (let i = 0; i < STUD_COUNT; ++i) {
                people.push(createStudent());
            }

            people.forEach((person) => {
                Student.register(person, "password", (err, user) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("Registered " + person.username);
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