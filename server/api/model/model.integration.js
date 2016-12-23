'use strict';

var app = require('../..');
import request from 'supertest';

var newModel;

describe('Model API:', function() {
  describe('GET /api/models', function() {
    var models;

    beforeEach(function(done) {
      request(app)
        .get('/api/models')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          models = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      models.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/models', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/models')
        .send({
          name: 'New Model',
          info: 'This is the brand new model!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newModel = res.body;
          done();
        });
    });

    it('should respond with the newly created model', function() {
      newModel.name.should.equal('New Model');
      newModel.info.should.equal('This is the brand new model!!!');
    });
  });

  describe('GET /api/models/:id', function() {
    var model;

    beforeEach(function(done) {
      request(app)
        .get(`/api/models/${newModel._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          model = res.body;
          done();
        });
    });

    afterEach(function() {
      model = {};
    });

    it('should respond with the requested model', function() {
      model.name.should.equal('New Model');
      model.info.should.equal('This is the brand new model!!!');
    });
  });

  describe('PUT /api/models/:id', function() {
    var updatedModel;

    beforeEach(function(done) {
      request(app)
        .put(`/api/models/${newModel._id}`)
        .send({
          name: 'Updated Model',
          info: 'This is the updated model!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedModel = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedModel = {};
    });

    it('should respond with the original model', function() {
      updatedModel.name.should.equal('New Model');
      updatedModel.info.should.equal('This is the brand new model!!!');
    });

    it('should respond with the updated model on a subsequent GET', function(done) {
      request(app)
        .get(`/api/models/${newModel._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let model = res.body;

          model.name.should.equal('Updated Model');
          model.info.should.equal('This is the updated model!!!');

          done();
        });
    });
  });

  describe('PATCH /api/models/:id', function() {
    var patchedModel;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/models/${newModel._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Model' },
          { op: 'replace', path: '/info', value: 'This is the patched model!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedModel = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedModel = {};
    });

    it('should respond with the patched model', function() {
      patchedModel.name.should.equal('Patched Model');
      patchedModel.info.should.equal('This is the patched model!!!');
    });
  });

  describe('DELETE /api/models/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/models/${newModel._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when model does not exist', function(done) {
      request(app)
        .delete(`/api/models/${newModel._id}`)
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
