var express = require('express');
var router = express.Router();
const csrf = require('csurf');
let csrfProtection = csrf({ cookie: true })
const passport = require('passport')

const passportConfig = require('../config/passport');

 router.use(csrfProtection);//to let all route use csrf protection

// passport.use(passportConfig,passportConfig.);

router.get('/profile',isLoggedIn,function (req, res) {
    console.log("inside  get profile route")
    res.render('user/profile');
});

router.get('/logout',function (req, res) {
    req.logout();
    res.redirect('/');
})

router.use('/',notLoggedIn,function (req,res,next) {
    return next();
})
/* GET users listing. */
router.get('/signup', function(req, res, next) {
    var messages = req.flash('error');
  res.render('user/signup',{csrfToken:req.csrfToken(), message: messages,hasError: messages.length >0});
});


router.post('/signup',function (req, res, next) {
 console.log(req.body);

  passport.authenticate('local.signup',{
    successRedirect: "/users/profile",
    failureRedirect: "/users/signup",
    failureFlash : true
  })(req,res,next);
});




router.get('/login',function (req, res) {
    res.render('user/login',{csrfToken:req.csrfToken() })
});

router.post('/login',function (req, res,next) {

    passport.authenticate('local.login',{
        successRedirect: "/users/profile",
        failureRedirect: "/users/login",
        failureFlash : true
    })(req,res,next);
})


module.exports = router;


function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/');

}

function notLoggedIn(req, res, next) {
    if( !req.isAuthenticated() ){
        return next();
    }
    res.redirect('/');

}