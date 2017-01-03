'use strict';

var app = require('../..');
import request from 'supertest';

var newVehicleModel;

describe('VehicleModel API:', function() {
  describe('GET /api/vehicleModels', function() {
    var vehicleModels;

    beforeEach(function(done) {
      request(app)
        .get('/api/vehicleModels')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          vehicleModels = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      vehicleModels.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/vehicleModels', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/vehicleModels')
        .send({
          name: 'New VehicleModel',
          info: 'This is the brand new vehicleModel!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newVehicleModel = res.body;
          done();
        });
    });

    it('should respond with the newly created vehicleModel', function() {
      newVehicleModel.name.should.equal('New VehicleModel');
      newVehicleModel.info.should.equal('This is the brand new vehicleModel!!!');
    });
  });

  describe('GET /api/vehicleModels/:id', function() {
    var vehicleModel;

    beforeEach(function(done) {
      request(app)
        .get(`/api/vehicleModels/${newVehicleModel._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          vehicleModel = res.body;
          done();
        });
    });

    afterEach(function() {
      vehicleModel = {};
    });

    it('should respond with the requested vehicleModel', function() {
      vehicleModel.name.should.equal('New VehicleModel');
      vehicleModel.info.should.equal('This is the brand new vehicleModel!!!');
    });
  });

  describe('PUT /api/vehicleModels/:id', function() {
    var updatedVehicleModel;

    beforeEach(function(done) {
      request(app)
        .put(`/api/vehicleModels/${newVehicleModel._id}`)
        .send({
          name: 'Updated VehicleModel',
          info: 'This is the updated vehicleModel!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedVehicleModel = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedVehicleModel = {};
    });

    it('should respond with the original vehicleModel', function() {
      updatedVehicleModel.name.should.equal('New VehicleModel');
      updatedVehicleModel.info.should.equal('This is the brand new vehicleModel!!!');
    });

    it('should respond with the updated vehicleModel on a subsequent GET', function(done) {
      request(app)
        .get(`/api/vehicleModels/${newVehicleModel._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let vehicleModel = res.body;

          vehicleModel.name.should.equal('Updated VehicleModel');
          vehicleModel.info.should.equal('This is the updated vehicleModel!!!');

          done();
        });
    });
  });

  describe('PATCH /api/vehicleModels/:id', function() {
    var patchedVehicleModel;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/vehicleModels/${newVehicleModel._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched VehicleModel' },
          { op: 'replace', path: '/info', value: 'This is the patched vehicleModel!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedVehicleModel = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedVehicleModel = {};
    });

    it('should respond with the patched vehicleModel', function() {
      patchedVehicleModel.name.should.equal('Patched VehicleModel');
      patchedVehicleModel.info.should.equal('This is the patched vehicleModel!!!');
    });
  });

  describe('DELETE /api/vehicleModels/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/vehicleModels/${newVehicleModel._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when vehicleModel does not exist', function(done) {
      request(app)
        .delete(`/api/vehicleModels/${newVehicleModel._id}`)
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
