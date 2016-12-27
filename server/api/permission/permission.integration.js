'use strict';

var app = require('../..');
import request from 'supertest';

var newPermission;

describe('Permission API:', function() {
  describe('GET /api/permissions', function() {
    var permissions;

    beforeEach(function(done) {
      request(app)
        .get('/api/permissions')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          permissions = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      permissions.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/permissions', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/permissions')
        .send({
          name: 'New Permission',
          info: 'This is the brand new permission!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newPermission = res.body;
          done();
        });
    });

    it('should respond with the newly created permission', function() {
      newPermission.name.should.equal('New Permission');
      newPermission.info.should.equal('This is the brand new permission!!!');
    });
  });

  describe('GET /api/permissions/:id', function() {
    var permission;

    beforeEach(function(done) {
      request(app)
        .get(`/api/permissions/${newPermission._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          permission = res.body;
          done();
        });
    });

    afterEach(function() {
      permission = {};
    });

    it('should respond with the requested permission', function() {
      permission.name.should.equal('New Permission');
      permission.info.should.equal('This is the brand new permission!!!');
    });
  });

  describe('PUT /api/permissions/:id', function() {
    var updatedPermission;

    beforeEach(function(done) {
      request(app)
        .put(`/api/permissions/${newPermission._id}`)
        .send({
          name: 'Updated Permission',
          info: 'This is the updated permission!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedPermission = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedPermission = {};
    });

    it('should respond with the original permission', function() {
      updatedPermission.name.should.equal('New Permission');
      updatedPermission.info.should.equal('This is the brand new permission!!!');
    });

    it('should respond with the updated permission on a subsequent GET', function(done) {
      request(app)
        .get(`/api/permissions/${newPermission._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let permission = res.body;

          permission.name.should.equal('Updated Permission');
          permission.info.should.equal('This is the updated permission!!!');

          done();
        });
    });
  });

  describe('PATCH /api/permissions/:id', function() {
    var patchedPermission;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/permissions/${newPermission._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Permission' },
          { op: 'replace', path: '/info', value: 'This is the patched permission!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedPermission = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedPermission = {};
    });

    it('should respond with the patched permission', function() {
      patchedPermission.name.should.equal('Patched Permission');
      patchedPermission.info.should.equal('This is the patched permission!!!');
    });
  });

  describe('DELETE /api/permissions/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/permissions/${newPermission._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when permission does not exist', function(done) {
      request(app)
        .delete(`/api/permissions/${newPermission._id}`)
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
