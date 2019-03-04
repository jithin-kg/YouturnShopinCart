const mongoose = require('mongoose');

const  Schema = mongoose.Schema;

const orderSchema = new Schema({
  name :{   type: Schema.Types.ObjectId, ref: 'User' },
    cart: { type: Object, require: true},
    address: {type: String},
    paymentId: { type: String}
})

module.exports = mongoose.model("Orders",orderSchema);