const sinon = require('sinon');
const expect = require('chai').expect;
const app = require('../../server');
const request = require('request');
const mongoose = require('mongoose');
require('sinon-mongoose');

const House = require('../../app/models/house.js');

describe('Update a house', () => {
  it('should update the house', done => {
    const HouseMock = sinon.mock(new House({
      address: 0x00,
      name: "Test",
      price: 0,
      forSale: true,
      owner: 0x000
    }));
    const house = HouseMock.object;
    const expectedResult = {status: true};
    HouseMock.expects('save').withArgs({_id: 12345}).yields(null, expectedResult);
    house.save({_id: 12345}, (err, result) => {
      HouseMock.verify();
      HouseMock.restore();
      expect(result.status).to.be.true;
      done();
    });
  });

  it('should return error if the house is not updated', done => {
    const HouseMock = sinon.mock(new House({
      address: 0x00,
      name: "Test",
      price: 0,
      forSale: true,
      owner: 0x000
    }));
    const house = HouseMock.object;
    const expectedResult = {status: false};
    HouseMock.expects('save').withArgs({_id: 12345}).yields(expectedResult, null);
    house.save({_id: 12345}, (err, result) => {
      HouseMock.verify();
      HouseMock.restore();
      expect(err.status).to.be.false;
      done();
    });
  });
});