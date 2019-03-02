const passport = require('passport');

const User = require('../models/users');

let localStrategy =   require('passport-local').Strategy;

passport.serializeUser(function (user, done) {

    done(null, user.id)
})

passport.deserializeUser(function (id,done) {
    
    User.findById(id,function (err, user) {


        done(err,user)
    })
    
})


//signup config

passport.use('local.signup',new localStrategy({
    userNameField: 'email',
    passwordField : 'password',
    passReqToCallback: true
},function ( req, email, password, done ) {
  User.findOne({"email": email},function (err, data) {
      if(err){
          console.log("Error while passport user singup")

          return done(err);
      }
      if(user){
          console.log("user already exist in passport singup")

          return done(null, false, {message: "Email already in use. "});
      }
      console.log("crating new user passport user singup")

      let newUser = new User();
      newUser.email =  email;
      newUser.password = newUser.encryptPassword(password);

      newUser.save(function (err, data) {
          if(err){
              return done(err);
          }
          return done(null, newUser);
      })

  })
    
}))