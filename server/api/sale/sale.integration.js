'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newSale;

describe('Sale API:', function() {
  describe('GET /api/sales', function() {
    var sales;

    beforeEach(function(done) {
      request(app)
        .get('/api/sales')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          sales = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      sales.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/sales', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/sales')
        .send({
          name: 'New Sale',
          info: 'This is the brand new sale!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newSale = res.body;
          done();
        });
    });

    it('should respond with the newly created sale', function() {
      newSale.name.should.equal('New Sale');
      newSale.info.should.equal('This is the brand new sale!!!');
    });
  });

  describe('GET /api/sales/:id', function() {
    var sale;

    beforeEach(function(done) {
      request(app)
        .get(`/api/sales/${newSale._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          sale = res.body;
          done();
        });
    });

    afterEach(function() {
      sale = {};
    });

    it('should respond with the requested sale', function() {
      sale.name.should.equal('New Sale');
      sale.info.should.equal('This is the brand new sale!!!');
    });
  });

  describe('PUT /api/sales/:id', function() {
    var updatedSale;

    beforeEach(function(done) {
      request(app)
        .put(`/api/sales/${newSale._id}`)
        .send({
          name: 'Updated Sale',
          info: 'This is the updated sale!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedSale = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedSale = {};
    });

    it('should respond with the updated sale', function() {
      updatedSale.name.should.equal('Updated Sale');
      updatedSale.info.should.equal('This is the updated sale!!!');
    });

    it('should respond with the updated sale on a subsequent GET', function(done) {
      request(app)
        .get(`/api/sales/${newSale._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let sale = res.body;

          sale.name.should.equal('Updated Sale');
          sale.info.should.equal('This is the updated sale!!!');

          done();
        });
    });
  });

  describe('PATCH /api/sales/:id', function() {
    var patchedSale;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/sales/${newSale._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Sale' },
          { op: 'replace', path: '/info', value: 'This is the patched sale!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedSale = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedSale = {};
    });

    it('should respond with the patched sale', function() {
      patchedSale.name.should.equal('Patched Sale');
      patchedSale.info.should.equal('This is the patched sale!!!');
    });
  });

  describe('DELETE /api/sales/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/sales/${newSale._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when sale does not exist', function(done) {
      request(app)
        .delete(`/api/sales/${newSale._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
