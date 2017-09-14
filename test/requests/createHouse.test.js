const sinon = require('sinon');
const expect = require('chai').expect;
const app = require('../../server');
const request = require('request');
const mongoose = require('mongoose');
require('sinon-mongoose');

const House = require('../../app/models/house.js');

describe('Post a new house', () => {
  it('should create a new house', done => {
    const HouseMock = sinon.mock(new House({
      address: 0x00,
      name: "Test",
      price: 0,
      forSale: true,
      owner: 0x000
    }));
    const house = HouseMock.object;
    const expectedResult = {status: true};
    HouseMock.expects('save').yields(null, expectedResult);
    house.save( (err, result) => {
      HouseMock.verify();
      HouseMock.restore();
      expect(result.status).to.be.true;
      done();
    });
  });

  it('should return error, if post not saved', done => {
    const HouseMock = sinon.mock(new House({
      address: 0x00,
      name: "Test",
      price: 0,
      forSale: true,
      owner: 0x000
    }));
    const house = HouseMock.object;
    const expectedResult = {status:false};
    HouseMock.expects('save').yields(expectedResult, null);
    house.save( (err, result) => {
      HouseMock.verify();
      HouseMock.restore();
      expect(err.status).to.not.be.true;
      done();
    });
  });
});