var express = require('express');
var router = express.Router();
const csrf = require('csurf');
let csrfProtection = csrf({ cookie: true })
const passport = require('passport')


router.use(csrfProtection);//to let all route use csrf protection

/* GET users listing. */
router.get('/signup', function(req, res, next) {
  res.render('user/signup',{csrfToken:req.csrfToken()});
});


router.post('/signup',passport.authenticate('local.signup',{
    successRedirect: "/profile",
    failureRedirect: "/users/signup",
    failureFlash : true
  }),function (req , res) {
  console.log(req.body);
});


router.get('/profile',function (req, res) {
console.log("inside  get profile route")
  res.render('user/profile');
})
module.exports = router;
