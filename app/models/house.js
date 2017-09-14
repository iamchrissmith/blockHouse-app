const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

const HouseSchema = new Schema({
  address : {type : String, default: '0x00'},
  name    : {type : String, default: ''},
  price   : {type : Number, default: 0},
  forSale : {type : Boolean, default: false},
  owner   : {type : String, default: '0x00'}
});

module.exports = mongoose.model('House', HouseSchema);