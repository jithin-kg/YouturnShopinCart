mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},

});

userSchema.methods.encryptPassword = function(password){
    return bcrypt.hashSync(password,bcrypt.genSalt(10),null);
}

userSchema.methods.dcryptPassword = function(password){
    return bcrypt.compareSync(password,this.password);
}

module.exports = mongoose.model('User',userSchema);