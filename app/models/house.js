const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

const HouseSchema = new Schema({
  address : {type : String, required: true},
  name    : {type : String, default: ''},
  price   : {type : Number, default: 0},
  forSale : {type : Boolean, default: false},
  owner   : {type : String, required: true}
});

module.exports = mongoose.model('House', HouseSchema);