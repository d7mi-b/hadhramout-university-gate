const Student = require('../Models/studentModel');
const Employee = require('../Models/employeeModel');
const { ObjectId } = require('mongodb');


const handleErrors = (err) => {
    console.log(err.message)
}

module.exports.login_get = (req,res) => {
    res.status(200).send("Hello")
}


module.exports.login_post_student = async (req,res) => {

    const {username , password} = req.body;

    try{
        const student = await Student.login(username,password);
        if(student){
            res.status(200).json(student)
            return;
        }
    }
    catch(err) {
        res.status(400).json(err.message)
    }
}

module.exports.login_post_employee = async (req,res) => {

    const {username , password} = req.body;

    try{
        const employee = await Employee.login(username,password)
        if(employee){
            res.status(200).json(employee)
            return;
        }
    }
    catch(err) {
        res.status(400).json(err.message)
    }
}

// To update wallte of student
module.exports.update_wallte = async (req, res) => {
    const {username, wallet} = req.body;

    const student = Student;
    student.updateOne({username: username}, {$set: {wallet: req.body.wallet}})
        .then(result => res.status(200))
        .catch(err => console.log(err));
}

module.exports.update_state = async (req, res) => {
    const {username, state, wallet} = req.body;

    const student = Student;
    student.updateOne({username: username}, {$set: {state: state, wallet: wallet}})
        .then(result => res.status(200).json(result))
        .catch(err => console.log(err));
}

module.exports.update_User = async (req, res) => {
    const {username} = req.query;

    Student.findOne({ username })
        .then(result => {
            return res.status(200).json(result)
        })
        .catch(err => console.log(err))
}

//To add students with Hashed password
module.exports.registerStudent= async (req,res) => {

        try{
            const student = await Student.create({
                _id: 111111,
                name:"عبدالرحمن بهيان",
                age:24,
                email:"abdulrahman@gmail.com",
                phoneNo:7345689,
                dateOfBirth:"27-5-1998",
                level: "مستوى الرابع",
                department:"هندسة حاسوب",
                typeOfRegister:"نفقة خاصة",
                state: true,
                wallet:10000,
                GPA: '79%',
                grades:[],
                username:1111,
                password:"1234"
            })
            res.status(201).json(student)
        }
        catch (err){
            console.log(err);
            res.status(400).send('error student not created')
        }
    
}

module.exports.registerEmployee= async (req,res) => {

    //create employee

    try{
        const employee = await Employee.create({
        
            name:"Ahmed",
            phone_NO:712946795,
            department:"Computer Engineering",
            email:"Ahmed@gmail.com",
            date_Of_Birth:"2-5-1989",
            username:"111",
            password:1234,
            position:"true"
        })
        res.status(201).json(employee)
    }
    catch (err){
        console.log(err);
        res.status(400).send('error employee not created')
    }
}