const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcrypt = require("bcryptjs");
const { json } = require('express');


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
        notification: {type: Array}
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




/*studentSchema.pre('save', function(next) {



    var student = this;

// only hash the password if it has been modified (or is new)
if (!student.isModified('password')) return next();

// generate a salt
bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(student.password, salt, function(err, hash) {
        if (err) return next(err);

        // override the cleartext password with the hashed one
        this.password = hash;
        next();
    });
});


});

studentSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};*/


const Student = mongoose.model('students',studentSchema);

module.exports = Student;
