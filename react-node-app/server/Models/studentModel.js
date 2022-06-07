const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcrypt = require("bcryptjs");
const SALT_WORK_FACTOR = 10;

const studentSchema = new Schema(
    {
        name : {type:String},
        dateOfBirth : {tupe:Date},
        registerNo: {type:Number},
        email : {type:String},
        age : {type:Number},
        phoneNo : {type:Number},
        grades : {type:Array},
        wallet : {type:Number},
        level : {type:Number},
        department : {type:String},
        typeOfRegister : {type:String},
        password : {type:String},
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
studentSchema.statics.login = async function(registerNo , password) {
    const student = await this.findOne({ registerNo });

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


const Student = mongoose.model('Student',studentSchema);

module.exports = Student;