mongoose = require('mongoose');
const bcrypt = require('bcrypt');



const Schema = mongoose.Schema;

const userSchema = new Schema({
    // userName:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},

});

userSchema.methods.encryptPassword = function(password, callback){
    console.log(typeof password);
    // return bcrypt.hashSync(password,bcrypt.genSalt(10),null);
    return bcrypt.genSalt(10,function (err, salt) {
        bcrypt.hash(password,salt,function (err, hash) {
            if(err){
                console.log("ERror bcrypt")
            }else {
                console.log(hash);
                return  callback(hash);
            }
        })
    })
}

userSchema.methods.dcryptPassword = function(password){
    return bcrypt.compareSync(password,this.password);
}

module.exports = mongoose.model('User',userSchema);