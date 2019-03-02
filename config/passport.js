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

// passport.use('local.signup',new localStrategy({
//     userNameField: "phoneNumber",
//     passwordField : "password",
//     passReqToCallback: true
// },function ( userName, password, done ) {
//     console.log("inside passport")
//   User.findOne({"email": email},function (err, data) {
//       if(err){
//           console.log("Error while passport user singup")
//
//           return done(err);
//       }
//       if(user){
//           console.log("user already exist in passport singup")
//
//           return done(null, false, {message: "Email already in use. "});
//       }
//
//       let newUser = new User();
//       newUser.email =  email;
//       newUser.password = newUser.encryptPassword(password);
//
//       newUser.save(function (err, data) {
//           if(err){
//               return done(err);
//           }
//           return done(null, newUser);
//       })
//
//   })
//
// }))
passport.use('local.signup', new LocalStrategy({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback:true
}, function(req, email, password, done){
    // req.checkBody('email','invalid email').notEmpty().isEmail();//validation
   //  req.checkBody('password','invalid password').notEmpty().isLength({min:4});
   // //  var errors = req.validationErrors();
   //  if(errors){
   //      var messages = [];
   //      errors.forEach(function (error) {
   //          messages.push(error.msg);
   //      });
   //      return done(null, false,req.flash('error',messages));
   //  }
    User.findOne({'email':email},function (err,user) {
        if (err) {
            console.log("Error");
            return done(err);
        }
        if (user) {
            return done(null,false,{message:'email already in use !'});
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