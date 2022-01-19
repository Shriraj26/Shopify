const { expect } = require('chai');
const request = require('supertest');
const { loadFileToDb, cleanTestDB } = require('../helper/loadFile');

const app = require('../index');

const db = require('../config/mongoose');

describe('CREATE /create', () => {
  // Call this if u want to set the data
  before((done) => {
    done();
  });

  it('OK', (done) => {
    request(app).post('/create')
      .send({
        name: 'aAsBCs', company: 'XYZ', quantity: 1, unit_price: 10,
      })
      .then((res) => {
        console.log(res.body);
      });
    done();
  });
});

describe('GET /fetch', () => {
  // Call this if u want to set the data
  before((done) => {
    done();
  });

  it('OK', (done) => {
    request(app).get('/fetch')
      .query({ id: '123' })
      .then((res) => {
        console.log(res.body);
      });
    done();
  });
});

describe('GET /getAll', () => {
  // Call this if u want to set the data
  before((done) => {
    done();
  });

  it('OK', (done) => {
    request(app).get('/getAll')
      .query({ page: '1', limit: '10' })
      .then((res) => {
        console.log(res.body);
      });
    done();
  });
});

describe('PUT /update', () => {
  // Call this if u want to set the data
  before((done) => {
    done();
  });

  it('OK', (done) => {
    request(app).put('/update')
      .send({
        name: 'aAsBCs', company: 'XYZ',
      })
      .query({ id: '123' })

      .then((res) => {
        console.log(res.body);
      });
    done();
  });
});

describe('DELETE /delete', () => {
  // Call this if u want to set the data
  before((done) => {
    done();
  });

  it('OK', (done) => {
    request(app).delete('/delete')
      .query({ id: '123' })

      .then((res) => {
        console.log(res.body);
      });
    done();
  });
});

describe('GET /undo', () => {
  // Call this if u want to set the data
  before((done) => {
    done();
  });

  it('OK', (done) => {
    request(app).get('/undo')
      .query({ id: '123' })
      .then((res) => {
        console.log(res.body);
      });
    done();
  });
});
