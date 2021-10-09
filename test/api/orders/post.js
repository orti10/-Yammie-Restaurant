
const expect = require('chai').expect;
const request = require('supertest');
const app = require('../../../app');
const db = require('../../../db/index');

//all tests for post request at '/orders'
describe('POST /orders', () => {
  //before all tests connects to the db
  before((done) => {
    db.connect()
    .then(() => done())
    .catch((err) => done(err));
  });

  //after all tests disconnect 
  after((done) => {
    db.close()
    .then(() => done())
    .catch((err) => done(err));
  });

  it('OK, creating a new order works with defaule values', (done) => {
    request(app).post('/orders')
    .send({items: [{item: 1},{item: 2}]})
    .then((res) => {
      const body = res.body;
      expect(body).to.have.property('_id');
      expect(body).to.have.property('date');
      expect(body).to.have.nested.property('items.[0]._id');
      expect(body).to.have.nested.property('items.[0].item', 1);
      expect(body).to.have.nested.property('items.[0].amount', 1);
      expect(body).to.have.nested.property('items.[1]._id');
      expect(body).to.have.nested.property('items.[1].item', 2);
      expect(body).to.have.nested.property('items.[1].amount', 1);
      done();
    })
    .catch((err) => done(err));
  });

  it('OK, creating a new order works', (done) => {
    request(app).post('/orders')
    .send({items: [{item: 1, amount: 4},{item: 2, amount: 2}], date: '2018-05-23'})
    .then((res) => {
      const body = res.body;
      expect(body).to.have.property('_id');
      expect(body).to.have.property('date');
      expect(body).to.have.nested.property('items.[0]._id');
      expect(body).to.have.nested.property('items.[0].item', 1);
      expect(body).to.have.nested.property('items.[0].amount', 4);
      expect(body).to.have.nested.property('items.[1]._id');
      expect(body).to.have.nested.property('items.[1].item', 2);
      expect(body).to.have.nested.property('items.[1].amount', 2);
      done();
    })
    .catch((err) => done(err));
  });
});