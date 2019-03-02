const express = require('express');
const router = express.Router();


const Products = require('../models/product');



/* GET home page. */
router.get('/',function(req, res, next) {

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
      // console.log(productChunks)
      res.render('shop/index',{products:productChunks});
    }
  })
  // res.render('shop/index', { title: 'Express' });
});

module.exports = router;
