'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newVehicleDetail;

describe('VehicleDetail API:', function() {
  describe('GET /api/vehicleDetails', function() {
    var vehicleDetails;

    beforeEach(function(done) {
      request(app)
        .get('/api/vehicleDetails')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          vehicleDetails = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      vehicleDetails.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/vehicleDetails', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/vehicleDetails')
        .send({
          name: 'New VehicleDetail',
          info: 'This is the brand new vehicleDetail!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newVehicleDetail = res.body;
          done();
        });
    });

    it('should respond with the newly created vehicleDetail', function() {
      newVehicleDetail.name.should.equal('New VehicleDetail');
      newVehicleDetail.info.should.equal('This is the brand new vehicleDetail!!!');
    });
  });

  describe('GET /api/vehicleDetails/:id', function() {
    var vehicleDetail;

    beforeEach(function(done) {
      request(app)
        .get(`/api/vehicleDetails/${newVehicleDetail._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          vehicleDetail = res.body;
          done();
        });
    });

    afterEach(function() {
      vehicleDetail = {};
    });

    it('should respond with the requested vehicleDetail', function() {
      vehicleDetail.name.should.equal('New VehicleDetail');
      vehicleDetail.info.should.equal('This is the brand new vehicleDetail!!!');
    });
  });

  describe('PUT /api/vehicleDetails/:id', function() {
    var updatedVehicleDetail;

    beforeEach(function(done) {
      request(app)
        .put(`/api/vehicleDetails/${newVehicleDetail._id}`)
        .send({
          name: 'Updated VehicleDetail',
          info: 'This is the updated vehicleDetail!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedVehicleDetail = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedVehicleDetail = {};
    });

    it('should respond with the updated vehicleDetail', function() {
      updatedVehicleDetail.name.should.equal('Updated VehicleDetail');
      updatedVehicleDetail.info.should.equal('This is the updated vehicleDetail!!!');
    });

    it('should respond with the updated vehicleDetail on a subsequent GET', function(done) {
      request(app)
        .get(`/api/vehicleDetails/${newVehicleDetail._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let vehicleDetail = res.body;

          vehicleDetail.name.should.equal('Updated VehicleDetail');
          vehicleDetail.info.should.equal('This is the updated vehicleDetail!!!');

          done();
        });
    });
  });

  describe('PATCH /api/vehicleDetails/:id', function() {
    var patchedVehicleDetail;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/vehicleDetails/${newVehicleDetail._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched VehicleDetail' },
          { op: 'replace', path: '/info', value: 'This is the patched vehicleDetail!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedVehicleDetail = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedVehicleDetail = {};
    });

    it('should respond with the patched vehicleDetail', function() {
      patchedVehicleDetail.name.should.equal('Patched VehicleDetail');
      patchedVehicleDetail.info.should.equal('This is the patched vehicleDetail!!!');
    });
  });

  describe('DELETE /api/vehicleDetails/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/vehicleDetails/${newVehicleDetail._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when vehicleDetail does not exist', function(done) {
      request(app)
        .delete(`/api/vehicleDetails/${newVehicleDetail._id}`)
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
