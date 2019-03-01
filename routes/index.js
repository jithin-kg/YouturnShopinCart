var express = require('express');
var router = express.Router();
const Products = require('../models/product');
const csrf = require('csurf');
let csrfProtection = csrf({ cookie: true })

/* GET home page. */
router.get('/',csrfProtection, function(req, res, next) {

  Products.find({},function (err ,data) {
    if(err){
      console.log("Eror while getting products from database");
      res.res(400);
    }else {
      productChunks = [];
      chunkSize = 3;
      for(let i=0;i<data.length;i+=chunkSize){
        productChunks.push(data.splice(i,i+chunkSize));
      }
      console.log(productChunks)
      res.render('shop/index',{products:productChunks,csrfToken:req.csrfToken()});
    }
  })
  // res.render('shop/index', { title: 'Express' });
});

module.exports = router;
