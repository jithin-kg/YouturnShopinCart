var express = require('express');
var router = express.Router();
const csrf = require('csurf');
let csrfProtection = csrf({ cookie: true })
const passport = require('passport')

const passportConfig = require('../config/passport');

 router.use(csrfProtection);//to let all route use csrf protection

// passport.use(passportConfig,passportConfig.);

/* GET users listing. */
router.get('/signup', function(req, res, next) {
  res.render('user/signup',{csrfToken:req.csrfToken()});
});


router.post('/signup',function (req, res, next) {
 console.log(req.body);
  passport.authenticate('local.signup',{
    successRedirect: "/users/profile",
    failureRedirect: "/users/signup",
    failureFlash : true
  })(req,res,next);
});


router.get('/profile',function (req, res) {
console.log("inside  get profile route")
  res.render('user/profile');
})
module.exports = router;
