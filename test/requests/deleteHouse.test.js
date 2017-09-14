const sinon = require('sinon');
const expect = require('chai').expect;
const app = require('../../server');
const request = require('request');
const mongoose = require('mongoose');
require('sinon-mongoose');

const House = require('../../app/models/house.js');

describe('Delete House by id', () => {
  it('should delete house by id', done => {
    const HouseMock = sinon.mock(House);
    const expectedResult = { status: true };
    HouseMock.expects('remove').withArgs({_id: 12345}).yields(null, expectedResult);
    House.remove({_id: 12345}, (err, result) => {
      HouseMock.verify();
      HouseMock.restore();
      expect(result.status).to.be.true;
      done();
    });
  });

  it('should reutrn error if delete action is failed', done => {
    const HouseMock = sinon.mock(House);
    const expectedResult = {status: false};
    HouseMock.expects('remove').withArgs({_id: 12345}).yields(expectedResult, null);
    House.remove({_id: 12345}, (err, result) => {
      HouseMock.verify();
      HouseMock.restore();
      expect(err.status).to.be.false;
      done();
    });
  });
});