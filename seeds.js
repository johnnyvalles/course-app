const mongoose = require("mongoose");
const Course = require("./models/course");
const Student = require("./models/student");
const faker = require("faker");

const STUD_COUNT = 3,
      HW_COUNT = 5;

faker.seed(1965);

const majors = [
    "Computer Science",
    "Computer Science & Engineering", 
    "Computer Engineering",
    "Software Engineering",
    "Electrical Engineering",
    "Computer Game Science",
    "Informatics",
]; 

const langs = {
    "HTML5": "html5",
    "JavaScript": "js square",
    "CSS3": "css3 alternate",
    "Git": "git square",
    "Python": "python"
};

function studentIdFromPhone(phone) {
    return phone.split("-").join("").slice(0, 7);
}

function randomMajor() {
    return majors[Math.floor(Math.random() * majors.length)]; // Returns a random major
}

function createStudent() {
    let card = faker.helpers.contextualCard();
    let student = {
        first: card.name,
        last: faker.name.lastName(),
        email: card.email,
        studentId: studentIdFromPhone(faker.phone.phoneNumberFormat()),
        major: randomMajor(),
        bio: faker.lorem.sentences(7),
        img: card.avatar,
    };
    student.username = (student.first + student.last).toLowerCase();
    return student;
}

function createCourse(lang, icon) {
    return {
        name: `Learn ${lang}`,
        instructor: `${faker.name.firstName()} ${faker.name.lastName()}`,
        subject: lang,
        icon: icon, 
        description: faker.lorem.sentences(4)
    };
}

function seedDB() {
    // Remove all Students
    Student.deleteMany({}, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Removed all students.");

            let students = [];

            for (let i = 0; i < STUD_COUNT; ++i) {
                students.push(createStudent());
            }

            students.forEach((student) => {
                Student.register(student, "password", (err, student) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("Registered " + student.username);
                    }
                });
            });
        }
    });

    // Remove all Courses
    Course.deleteMany({}, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Removed all courses.");
            for (let lang in langs) {
                Course.create(createCourse(lang, langs[lang]), (err, newCourse) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("Course added to DB.")
                    }
                });
            }
        }
    });
}

module.exports = seedDB;