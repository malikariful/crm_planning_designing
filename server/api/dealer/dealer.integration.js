'use strict';

var app = require('../..');
import request from 'supertest';

var newDealer;

describe('Dealer API:', function() {
  describe('GET /api/dealers', function() {
    var dealers;

    beforeEach(function(done) {
      request(app)
        .get('/api/dealers')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          dealers = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      dealers.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/dealers', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/dealers')
        .send({
          name: 'New Dealer',
          info: 'This is the brand new dealer!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newDealer = res.body;
          done();
        });
    });

    it('should respond with the newly created dealer', function() {
      newDealer.name.should.equal('New Dealer');
      newDealer.info.should.equal('This is the brand new dealer!!!');
    });
  });

  describe('GET /api/dealers/:id', function() {
    var dealer;

    beforeEach(function(done) {
      request(app)
        .get(`/api/dealers/${newDealer._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          dealer = res.body;
          done();
        });
    });

    afterEach(function() {
      dealer = {};
    });

    it('should respond with the requested dealer', function() {
      dealer.name.should.equal('New Dealer');
      dealer.info.should.equal('This is the brand new dealer!!!');
    });
  });

  describe('PUT /api/dealers/:id', function() {
    var updatedDealer;

    beforeEach(function(done) {
      request(app)
        .put(`/api/dealers/${newDealer._id}`)
        .send({
          name: 'Updated Dealer',
          info: 'This is the updated dealer!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedDealer = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedDealer = {};
    });

    it('should respond with the original dealer', function() {
      updatedDealer.name.should.equal('New Dealer');
      updatedDealer.info.should.equal('This is the brand new dealer!!!');
    });

    it('should respond with the updated dealer on a subsequent GET', function(done) {
      request(app)
        .get(`/api/dealers/${newDealer._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let dealer = res.body;

          dealer.name.should.equal('Updated Dealer');
          dealer.info.should.equal('This is the updated dealer!!!');

          done();
        });
    });
  });

  describe('PATCH /api/dealers/:id', function() {
    var patchedDealer;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/dealers/${newDealer._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Dealer' },
          { op: 'replace', path: '/info', value: 'This is the patched dealer!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedDealer = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedDealer = {};
    });

    it('should respond with the patched dealer', function() {
      patchedDealer.name.should.equal('Patched Dealer');
      patchedDealer.info.should.equal('This is the patched dealer!!!');
    });
  });

  describe('DELETE /api/dealers/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/dealers/${newDealer._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when dealer does not exist', function(done) {
      request(app)
        .delete(`/api/dealers/${newDealer._id}`)
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
