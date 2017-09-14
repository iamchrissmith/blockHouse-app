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
  before( done => {
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

  describe('GET /api/v1/houses', () => {
    it('should return empty array', done => {
      chai.request(server)
        .get('/api/v1/houses')
        .end( (err, res) => {
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          assert.equal(res.body.length, 0);
          done();
        });
    });
  });

  describe('POST /api/v1/houses', () => {
    it('it should POST a house with address and owner', done => {
      const goodHouse = {
        address: '0x000',
        owner: '0x00'
      };
      chai.request(server)
        .post('/api/v1/houses')
        .send(goodHouse)
        .end( (err, res) => {
          assert.equal(res.status, 200);
          assert.isObject(res.body);
          assert.property(res.body, 'message');
          assert.equal(res.body.message, 'House created!');
          done();
        });
    });


    it('it should not POST a house without address', done => {
      const badHouse = {
        address: '',
        owner: '0x00'
      };
      chai.request(server)
        .post('/api/v1/houses')
        .send(badHouse)
        .end( (err, res) => {
          assert.equal(res.status, 200);
          assert.isObject(res.body);
          assert.property(res.body, 'errors');
          assert.property(res.body.errors, 'address');
          assert.equal(res.body.errors.address.kind, 'required');
          done();
        });
    });
  });
  
});