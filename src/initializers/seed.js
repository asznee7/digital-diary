'use strict';

const sequelize = require('../utils/sequelize');
const {User, Subject, Class, Student, Teacher, Mark} = require('../models');
const config = require('../config');
const Chance = require('chance');
const bcrypt = require("bcrypt");

const initializerSeed = async () => {
    console.log('initializerSeed');

    const usersNum = await User.count();
    if (usersNum) {
        console.log('initializerSeed -> seed executed earlier');
        return;
    }

    await sequelize.transaction(async (transaction) => {
        const subjects = [];
        let initSubjects = config.database.inits.subjects;
        for (let i = 0; i < initSubjects.length; i++) {
            const subject = await Subject.create({
                name: initSubjects[i]
            }, { transaction });
            subjects.push(subject);
        }

        const classes = [];
        let initClasses = config.database.inits.classes;
        for (let i = 0; i < initClasses.length; i++) {
            const tclass = await Class.create({
                name: initClasses[i]
            }, { transaction });
            classes.push(tclass);
        }

        const chance = new Chance();
        const users = [];
        const teachers = [];
        const students = [];
        let initUsers = config.database.inits.users;
        for (let i = 0; i < initUsers.length; i++) {
            const user = await User.create({
                name: initUsers[i].name,
                username: initUsers[i].name.replace(' ', '').toLowerCase(),
                password: bcrypt.hashSync(initUsers[i].password, 10),
                address: chance.address(),
                phone: chance.phone()
            }, {transaction});
            users.push(user);

            if (i < 5) {
                let teacher = Teacher.build({});
                teacher.setUser(user, { save: false });
                await teacher.save({ transaction });
                teachers.push(teacher);
            }
            else {
                let student = Student.build({});
                student.setUser(user, { save: false });
                await student.save({ transaction });
                students.push(student);
            }
        }
    });

    const subjects = await Subject.findAll();
    const teachers = await Teacher.findAll();
    const classes = await Class.findAll();
    const students = await Student.findAll();

    for (let i = 0; i < teachers.length; i++) {
        if (subjects.length > i) {
            await subjects[i].setTeachers(teachers[i])
        }
        if (classes.length > i) {
            await teachers[i].setClasses(classes[i]);
        }
    }

    if (classes.length <= students.length) {
        let i, j, k, temparray, chunk = Math.round(students.length/classes.length);
        for (i = 0, j = students.length, k = 0; i < j; i += chunk, k++) {
            temparray = students.slice(i, i + chunk);
            await classes[k].setStudents(temparray);
        }
    }

    console.log('initializerSeed -> done');
};

module.exports = initializerSeed;