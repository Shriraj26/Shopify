/* eslint-disable no-undef */
const { expect } = require('chai');
const request = require('supertest');
const Inventory = require('../models/inventory');

const app = require('../index');

const db = require('../config/mongoose');

describe('Inventory', () => {
  // Create an item in inventory
  describe('CREATE /create', () => {
    it('Created product', async () => {
      const res = await request(app).post('/create').send({
        name: 'ABCD', company: 'XYZ', quantity: 1, unit_price: 10,
      });

      // Fetch the created product
      const actualResult = await Inventory
        .findOne()
        .where({
          isActive: true, name: 'ABCD', company: 'XYZ', quantity: 1, unit_price: 10,
        });

      // An entry of the name, company quantity and unit price should be created
      expect(actualResult).to.have.property('name').equal('ABCD');
      expect(actualResult).to.have.property('company').equal('XYZ');
      expect(actualResult).to.have.property('quantity').equal(1);
      expect(actualResult).to.have.property('unit_price').equal(10);

      // status success
      expect(res.body).to.have.property('status').equal('Success');
    });
  });

  // Fetch an item to test update, delete and undo feature
  let itemToFetch;
  describe('Fetch an item for testing', () => {
    it('Fetch product for internal testing', async () => {
      itemToFetch = await Inventory.findOne({ }).select('_id');
      itemToFetch = itemToFetch._id.toString();
    });
  });

  // Fetch an item with itemid that is invalid
  describe('GET /fetch', () => {
    it('Fetch a product with id', async () => {
      const res = await request(app).get('/fetch')
        .query({ id: '123' });
      expect(res.body).to.have.property('message').equal('Invalid id');
    });
  });

  // Get items with page number and limit
  describe('GET /getAll', () => {
    it('Fetch a product with page number and limit', async () => {
      const res = await request(app).get('/getAll')
        .query({ page: '2', limit: '10' });

      // As this product does not exist, nothing should be returned
      expect(res.body).to.have.length(0);
    });
  });

  // Update a product
  describe('PUT /update', () => {
    it('Update a product', async () => {
      const res = await request(app).put('/update')
        .query({ id: itemToFetch })
        .send({ name: 'XYZ' });

      // Get the updated product
      const actualResult = await Inventory.findById(itemToFetch).where({ isActive: true });

      // Now the product should have updated quantity of XYZ
      expect(actualResult).to.have.property('name').equal('XYZ');

      // The response should be success
      expect(res.body).to.have.property('status').equal('Success');
    });
  });

  // Delete an item
  describe('DELETE /delete', () => {
    it('Delete a product with product id', async () => {
      const res = await request(app).delete('/delete')
        .query({ id: itemToFetch })
        .send({ comment: 'Delete now' });

      const actualResult = await Inventory.findById(itemToFetch).where({ isActive: true });

      // This will confirm from db that data does not exist in the database for that id
      expect(actualResult).to.be.null;

      // this will confirm that the returned response is success for delete
      expect(res.body).to.have.property('status').equal('Success');
    });
  });

  // undo an item
  describe('GET /undo', () => {
    it('Undo delete a product with given id', async () => {
      const res = await request(app).post('/undo')
        .query({ id: itemToFetch });
      const actualResult = await Inventory.findById(itemToFetch).where({ isActive: true });
      // Now this should exist in the database
      expect(actualResult).to.have.property('_id');

      // status success
      expect(res.body).to.have.property('status').equal('Success');
    });
  });

  // Drop the database after all the tests
  describe('Drop the database', () => {
    it('Drop the database after u finish the testing', async () => {
      await Inventory.deleteMany({});
    });
  });
});
