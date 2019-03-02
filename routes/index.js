const express = require('express');
const router = express.Router();



const Products = require('../models/product');
let Cart = require('../models/cart');


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

router.get('/addToCart/:id',function (req, res ,next) {
  let productId = req.params.id;

  let cart = new Cart(req.session.cart ? req.session.cart : {})

  Products.findOne({ _id:productId},function (err, product) {
    if(err){
      return res.redirect('/');
    }
    cart.add(product,product.id);
    req.session.cart = cart;
    console.log(req.session.cart);
    res.redirect('/');
  })

})


router.get('/viewCart', function (req, res, next) {
  if( !req.session.cart ){
    res.render('shop/shopingCart', {products: null});
  }

  let cart = new Cart(req.session.cart);
  res.render('shop/shopingCart', {products: cart.generateArray(), totalPrice: cart.totalPrice})
})
module.exports = router;
