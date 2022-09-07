const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcrypt = require('bcryptjs')

const adminSchema = new Schema(
    {
        name : {type:String},
        username : {type:Number},
        password : {type:String},
        position: {type: String}
    },
    {
        timestamps : true,
    }
)

//to Hash the password
adminSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password,salt);
    next();
})

//to create the login method
adminSchema.statics.login = async function(username , password) {
    const admin = await this.findOne({ username });
    
    if(admin) {
        const auth = await bcrypt.compare(password, admin.password);
        if(auth) {
            return admin;
        }
        throw Error('incorrect password')
    }
    throw Error('incorrect user')
}


const Admin = mongoose.model('admin',adminSchema);
 
module.exports = Admin;