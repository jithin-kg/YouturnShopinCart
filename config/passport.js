const passport = require('passport');

const User = require('../models/users');

let LocalStrategy =   require('passport-local').Strategy;

passport.serializeUser(function (user, done) {

    done(null, user.id)
})

passport.deserializeUser(function (id, done) {
    
    User.findById(id,function (err, user) {


        done(err,user)
    })
    
})


//signup config


passport.use('local.signup', new LocalStrategy({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback:true
}, function(req, email, password, done){

    // req.checkBody('email',"Invalid Email").isEmpty().isEmail();
    // req.checkBody('password',"Invalid Password").isEmpty().isLength({min:5});

    User.findOne({'email':email},function (err,user) {
        if (err) {
            console.log("Error");
            return done(err);
        }
        if (user) {
            return done(null,false,{messages:'email already in use !'});
        }
        var newUser = new User();
        newUser.email = email;
        console.log(password);
        // newUser.password = newUser.encryptPassword(password.toString());
      newUser.encryptPassword(password,function (hashedPaswrd) {
          newUser.password = hashedPaswrd;
          console.log("bcrypted password in passoprt is "+ newUser.password);

          newUser.save(function (err, result) {
              if(err){
                  return done(err);
              }
              else{
                  console.log(result);
                  return done(null,newUser);
              }

          });
      });



    });
}));


//user login
passport.use('local.login',new LocalStrategy({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback:true
},function (req, email, password, done) {
    User.findOne({'email':email},function ( err, user  ) {
        if(err){
            return done(err);
        }
        if(!user){
            return done(null,false);

        }
        if(!user.validatePassword()){
            return done(null,false);
        }
        return done(null, user);
    })
}))