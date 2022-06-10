const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcrypt = require('bcryptjs')

const employeeSchema = new Schema(
    {
        name : {type:String},
        phoneNo : {type:Number},
        username : {type:Number},
        department : {type:String},
        email : {type:String},
        dateOfBirth : {type:Date},
        password : {type:String},
        position: {type: String}
    },
    {
        timestamps : true,
    }
)

//to Hash the password
employeeSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password,salt);
    next();
})

//to create the login method
employeeSchema.statics.login = async function(username , password) {
    const employee = await this.findOne({ username });
    
    if(employee) {
        const auth = await bcrypt.compare(password, employee.password);
        if(auth) {
            return employee;
        }
        throw Error('incorrect password')
    }
    throw Error('incorrect user')
}


const Employee = mongoose.model('employee',employeeSchema);

module.exports = Employee;