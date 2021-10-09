const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../../app');
const db = require('../../../db/index');
describe('GET /notes', () => {
  //before all tests connects to the db
  before((done) => {
    db.connect()
    .then(() => done())
    .catch((err) => done(err));
  });

  //if we are not using the mock connection, we will empty the db after every test
  if(process.env.NODE_ENV != 'test') {
    beforeEach((done) => {
      request(app).delete('/orders')
      .then(() => done());
    });
  };

  //after all tests disconnect 
  after((done) => {
    db.close()
    .then(() => done())
    .catch((err) => done(err));
  });

  it('OK, getting orders has no orders', (done) => {
    request(app).get('/orders')
      .then((res) => {
        const body = res.body;
        expect(body.length).to.equal(0);
        done();
      })
      .catch((err) => done(err));
  });

  it('OK, getting orders has 1 orders', (done) => {
    request(app).post('/orders')
      .send({"items": [{"item": 1, "amount": 4}]})
      .then((res) => {
        request(app).get('/orders')
          .then((res) => {
            const body = res.body;
            expect(body.length).to.equal(1);
            done();
          })
      })
      .catch((err) => done(err));
  });
});