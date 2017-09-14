const sinon = require('sinon');
const expect = require('chai').expect;
const app = require('../../server');
const request = require('request');
const mongoose = require('mongoose');
require('sinon-mongoose');

const House = require('../../app/models/house.js');

describe('Get all houses', () => {
  it('should return all houses', done => {
    const HouseMock = sinon.mock(House);
    const expectedResult = {status:true, houses:[]};
    HouseMock.expects('find').yields(null, expectedResult);
    House.find( (err, result) => {
      HouseMock.verify();
      HouseMock.restore();
      expect(result.status).to.be.true;
      done();
    });
  });

  it('should return error', done => {
    const HouseMock = sinon.mock(House);
    const expectedResult = {status: false, error: "Something went wrong"};
    HouseMock.expects('find').yields(expectedResult, null);
    House.find( (err, result) => {
      HouseMock.verify();
      HouseMock.restore();
      expect(err.status).to.not.be.true;
      done();
    });
  });
});