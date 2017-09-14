process.env.NODE_ENV = 'test';

const House = require('../../app/models/house.js');
const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
const server = require('../../server');

chai.use(chaiHttp);

var Mongoose = require('mongoose').Mongoose;
var mongoose = new Mongoose();

var Mockgoose = require('mockgoose').Mockgoose;
var mockgoose = new Mockgoose(mongoose);


describe('Houses', () => {
  before(function(done) {
    mockgoose.prepareStorage().then(function() {
      mongoose.connect('mongodb://localhost:27017/test-db', function(err) {
        done(err);
      });
    });
  });
  
  beforeEach( done => {
    House.remove({}, err => {
      done();
    });
  });

  describe('GET /houses', () => {
    it('should return empty array', done => {
      chai.request(server)
        .get('/api/v1/houses')
        .end( (err, res) => {
          assert.equal(res.status, 200);
          assert.instanceOf(res.body, Array);
          assert.equal(res.body.length, 0);
          done();
        });
      
    });
  });
  
});