const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

const HouseSchema = new Schema({
  address : {type : String, required: true},
  name    : {type : String, default: ''},
  price   : {type : Number, default: 0},
  forSale : {type : Boolean, default: false},
  owner   : {type : String, required: true},
  size    : {type : Number, default: 0},
  type    : {type : String, default: ''},
  bedrooms: {type : Number, default: 0},
  bathrooms: {type : Number, default: 0},
  description: {type : String, default: ''},
  st_address: {type : String, default: ''},
  city    : {type : String, default: ''},
  state    : {type : String, default: ''},
  zipcode    : {type : String, default: ''}
});

module.exports = mongoose.model('House', HouseSchema);