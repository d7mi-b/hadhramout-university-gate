const Student = require('../Models/studentModel');
const Employee = require('../Models/employeeModel');
const Admin= require('../Models/adminModel')
const bcrypt = require("bcryptjs");
const nodemailer = require('nodemailer');


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

module.exports.login_post_admin = async (req,res) => {

    const {username , password} = req.body;

    try{
        const admin = await Admin.login(username,password)
        if(admin){
            res.status(200).json(admin)
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

// update state of student
module.exports.update_state = async (req, res) => {
    const {username, state, wallet} = req.body;

    const student = Student;
    student.updateOne({username: username}, {$set: {state: state}})
        .then(result => res.status(200).json(result))
        .catch(err => console.log(err));
}

// update data of user
module.exports.update_User = async (req, res) => {
    const {username} = req.query;

    Student.findOne({ username }, {password: 0})
        .then(result => {
            return res.status(200).json(result)
        })
        .catch(err => console.log(err))
}

// delete notification
module.exports.deleteNotification = async (req, res) => {
    const {username, id} = req.body;

    Student.updateOne({username: username}, {$pull: {notification: {id: +id}}})
    .then(result => res.status(200).json(result))
    .catch(err => console.log(err))
}

// update state of notification
module.exports.stateNotification = async (req, res) => {
    const {username, id} = req.body;

    Student.updateOne({username: username, "notification.id": +id}, {$set: {"notification.$.new": false}})
    .then(result => res.status(200).json(result))
    .catch(err => console.log(err))
}

// get students from database
module.exports.getStudents = (req, res) => {
    const department = req.params.department;

    Student.find({department: department})
    .then(result => res.status(200).json(result))
    .catch(err => console.log(err));
}

// to add notifaction 
module.exports.addNotification = async (req, res) => {
    const {username, notify} = req.body;

    Student.updateOne({username: username}, {$push: {notification : {
        id: new Date().getTime(),
        notify: `الرجاء ${notify}`,
        new: true,
        date: new Date()
    }}})
    .then(result => res.status(200).json(result))
    .catch(err => console.log(err))
}

// check old password
module.exports.checkOldPassword = async (req, res) => {
    const {username, password} = req.query;

    const student = await Student.findOne({ username });
    const auth = await bcrypt.compare(password, student.password);

    if (auth)
        return res.status(200).json(auth)
    else
        return res.status(400).json(auth)
}

// change password of student
module.exports.changePassword = async (req, res) => {
    let password = req.body.password;
    const salt = await bcrypt.genSalt()
    let newpassword = await bcrypt.hash(password,salt);

    Student.updateOne({username: req.body.username}, {
        $set: {password: newpassword},
        $push: {notification : {
            id: new Date().getTime(),
            notify: `تم تغيير كلمة المرور بنجاح`,
            new: true,
            date: new Date()
        }}
    })
    .then(result => res.status(200).json(result))
    .catch(err => console.log(err))
}

// to send email
module.exports.sendEmail = async (req, res) => {
    const {username, email} = req.body;
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    var transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "91c2c8acb5d665",
            pass: "a0a10741cf783a"
        }
    });

    // send mail with defined transport object
    var mailOptions = {
        from: 'from@example.com',
        to: email,
        subject: 'تغير كلمة المرور',
        text: `!مرحبًا عزيزنا المستخدم
        لقد وصلنا منك طلب بأنك نسيت كلمة المرور يوسفنا حدوث ذلك وإليك هذا الرابط لتغير كلمة المرور الخاصة بك
        http://localhost:3000/forgetPassword/${new Date().getTime()}/${username}
        `,
        html: `
        <body dir="rtl" style="text-align: center; color: #0a214c">
            <img src='cid:uniq-HUGLogo.png' alt='logo' width='80px' hight='25px' style='margin: 10px' />
            <img src='cid:uniq-Hadhrmout.jpg' alt='logo' width='80px' hight='25px' style='margin: 10px' />
            <h3>مرحبًا عزيزنا المستخدم!</h3>
            <p> لقد وصلنا منك طلب بأنك نسيت كلمة المرور يوسفنا حدوث ذلك وإليك هذا 
            <a href="http://localhost:3000/forgetPassword/${new Date().getTime()}/${username}">الرابط</a>
            لتغير كلمة المرور الخاصة بك</p>
            <P>بوابة جامعة حضرموت لخدمات الطالب</p>
        </body>
        `,
        attachments: [
            {
                filename: 'Hadhrmout.jpg',
                path: 'D:/College/Mini Project/Web app/hug/react-node-app/client/src/images/Hadhrmout.jpg',
                cid: 'uniq-Hadhrmout.jpg'
            },
            {
                filename: 'HUGLogo.png',
                path: 'D:/College/Mini Project/Web app/hug/react-node-app/client/src/images/HUGLogo.png',
                cid: 'uniq-HUGLogo.png'
            }
        ]
    };
    transport.sendMail(mailOptions, (error, info) => {
        if (error) {
        return res.status(500)
        }
        console.log('Message sent: %s', info.messageId);
        return res.status(200)
    });
}

//To add students with Hashed password
module.exports.registerStudent= async (req,res) => {

        try{
            const student = await Student.create({
                name:"علي محمد",
                email:"ali@gmail.com",
                DOB:"27-5-1998",
                POB: 'المكلا',
                sex: 'ذكر',
                nationality: 'اليمن',
                yearToJoin: '2018-2019',
                level: "المستوى الرابع",
                department:"هندسة حاسوب",
                semester:"الفصل الدراسي الأول",
                group1:"A",
                group2:"صباحي",
                typeOfRegister:"نفقة خاصة",
                state: true,
                wallet:10000,
                GPA: '79%',
                username:33333333333,
                password:"1234",
                notification: [],
                position: "student"
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
            position:"employee"
        })
        res.status(201).json(employee)
    }
    catch (err){
        console.log(err);
        res.status(400).send('error employee not created')
    }
}

module.exports.registerAdmin= async (req,res) => {

    //create admin

    try{
        const admin = await Admin.create({
        
            name:"Halah",
            department:"maneger",
            username:12345678,
            password:1234,
            position:"admin"
        })
        res.status(201).json(admin)
    }
    catch (err){
        console.log(err);
        res.status(400).send('error employee not created')
    }
}