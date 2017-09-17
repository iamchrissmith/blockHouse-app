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
          assert.property(res.body, 'id');
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

  describe('GET /api/v1/houses/:id', () => {
    it('it should GET a house by id', done => {
      const house = new House({
        address: '0x000',
        owner: '0x00'
      });
      house.save( (err, _house) => {
        chai.request(server)
          .get(`/api/v1/houses/${_house.id}`)
          .end( (err, res) => {
            assert.equal(res.status, 200);
            assert.isObject(res.body);
            assert.property(res.body, 'address');
            assert.equal(res.body.address, house.address);

            assert.property(res.body, 'name');
            assert.equal(res.body.name, '');

            assert.property(res.body, 'price');
            assert.equal(res.body.price, 0);

            assert.property(res.body, 'forSale');
            assert.isFalse(res.body.forSale);

            assert.property(res.body, 'owner');
            assert.equal(res.body.owner, house.owner);

            assert.property(res.body, 'size');
            assert.equal(res.body.size, 0);

            assert.property(res.body, 'type');
            assert.equal(res.body.type, '');

            assert.property(res.body, 'bedrooms');
            assert.equal(res.body.bedrooms, 0);

            assert.property(res.body, 'bathrooms');
            assert.equal(res.body.bathrooms, 0);

            assert.property(res.body, 'description');
            assert.equal(res.body.description, '');

            assert.property(res.body, 'st_address');
            assert.equal(res.body.st_address, '');

            assert.property(res.body, 'city');
            assert.equal(res.body.city, '');

            assert.property(res.body, 'state');
            assert.equal(res.body.state, '');

            assert.property(res.body, 'zipcode');
            assert.equal(res.body.zipcode, '');
            done();
          });
      });
    });
  });

  describe('PUT /api/v1/houses/:id', () => {
    it('it should UPDATE a house by id', done => {
      const house = new House({
        address: '0x000',
        owner: '0x00'
      });
      const newHouse = {
        owner:'0x001',
        price: 100,
        forSale: true,
        name: 'New Name'
      };
      house.save( (err, _house) => {
        chai.request(server)
          .put(`/api/v1/houses/${_house.id}`)
          .send(newHouse)
          .end( (err, res) => {
            assert.equal(res.status, 200);
            assert.isObject(res.body);
            assert.property(res.body, 'message');
            assert.equal(res.body.message, 'House updated!');

            assert.property(res.body, 'house');

            assert.property(res.body.house, 'address');
            assert.equal(res.body.house.address, house.address);

            assert.property(res.body.house, 'name');
            assert.equal(res.body.house.name, newHouse.name);

            assert.property(res.body.house, 'price');
            assert.equal(res.body.house.price, newHouse.price);

            assert.property(res.body.house, 'forSale');
            assert.isTrue(res.body.house.forSale);

            assert.property(res.body.house, 'owner');
            assert.equal(res.body.house.owner, newHouse.owner);
            done();
          });
      });
    });
  });

  describe('DELETE /api/v1/houses/:id', () => {
    it('it should DELETE a house by id', done => {
      const house = new House({
        address: '0x000',
        owner: '0x00'
      });
      house.save( (err, _house) => {
        chai.request(server)
          .delete(`/api/v1/houses/${_house.id}`)
          .end( (err, res) => {
            assert.equal(res.status, 200);
            assert.isObject(res.body);
            assert.property(res.body, 'message');
            assert.equal(res.body.message, 'Successfully deleted');
            done();
          });
      });
    });
  });
});