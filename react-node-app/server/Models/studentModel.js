const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcrypt = require("bcryptjs");



const studentSchema = new Schema(
    {
        name : {type:String},
        DOB : {tupe:Date},
        username: {
            type:Number,
            required:[true , 'please enter username'],
            lowercase:true
        },
        email : {type:String},
        state: {type: Boolean},
        valid: {type: Boolean},
        wallet : {type:Number},
        level : {type:String},
        department : {type:String},
        semester:{type:String},
        group1:{type:String},
        group2:{type:String},
        typeOfRegister : {type:String},
        password : {
            type:String,
            required:[true, 'please enter a password'],
            minlength:[4, 'Minimum password length is 4 charachters']
        },
        GPA: {type: String},
        collage: {type: String},
        sex: {type: String},
        nationality: {type: String},
        POB: {type: String},
        yearToJoin: {type: String},
        gread: {type: String},
        notification: {type: Array},
        position: {type:String}
    },
    {
        timestamps : true,
    }
)

//to Hash the password
studentSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password,salt);
    next();
})

//to create the login method
studentSchema.statics.login = async function(username , password) {
    const student = await this.findOne({ username });

    if(student) {
        const auth = await bcrypt.compare(password, student.password);
        if(auth) {
            return student;
        }
        throw Error('incorrect password')
    }
    throw Error('incorrect user')
}






const Student = mongoose.model('students',studentSchema);

module.exports = Student;
