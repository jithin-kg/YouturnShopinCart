const mongoose = require('mongoose');

const Products = require('../models/product');

mongoose.connect("mongodb://localhost:27017/ShoppingCart",{useNewUrlParser:true});

// console.log(Product);

var product = [new Products({
  imagePath:"https://rukminim1.flixcart.com/image/496/595/jr9iwsw0/shoe/q/u/q/898464-018-8-nike-anthracite-pure-platinum-cool-grey-original-imafd3jk4b6fggsh.jpeg?q=50",
  title:"Nike shoes",
        discription:"Best shoes ever",
    price: 34
}),
    new Products({
        imagePath:"https://rukminim1.flixcart.com/image/496/595/jr9iwsw0/shoe/q/u/q/898464-018-8-nike-anthracite-pure-platinum-cool-grey-original-imafd3jk4b6fggsh.jpeg?q=50",
        title:"Nike shoes",
        discription:"Best shoes ever",
        price: 34
    }),
    new Products({
        imagePath:"https://rukminim1.flixcart.com/image/496/595/jr9iwsw0/shoe/q/u/q/898464-018-8-nike-anthracite-pure-platinum-cool-grey-original-imafd3jk4b6fggsh.jpeg?q=50",
        title:"Nike shoes",
        discription:"Best shoes ever",
        price: 34
    }) ,new Products({
        imagePath:"https://rukminim1.flixcart.com/image/496/595/jr9iwsw0/shoe/q/u/q/898464-018-8-nike-anthracite-pure-platinum-cool-grey-original-imafd3jk4b6fggsh.jpeg?q=50",
        title:"Nike shoes",
        discription:"Best shoes ever",
        price: 34
    })
    ]

for (let i = 0; i <product.length ; i++) {
    product[i].save(function (err, data) {
        if(err){
            console.log(err)
        }else if(i=== (product.length-1)){
          mongoose.disconnect();
          console.log("Disconnected")
        }

    });
}


// product.save();
