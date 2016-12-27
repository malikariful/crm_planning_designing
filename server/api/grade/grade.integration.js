'use strict';

var app = require('../..');
import request from 'supertest';

var newGrade;

describe('Grade API:', function() {
  describe('GET /api/grades', function() {
    var grades;

    beforeEach(function(done) {
      request(app)
        .get('/api/grades')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          grades = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      grades.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/grades', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/grades')
        .send({
          name: 'New Grade',
          info: 'This is the brand new grade!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newGrade = res.body;
          done();
        });
    });

    it('should respond with the newly created grade', function() {
      newGrade.name.should.equal('New Grade');
      newGrade.info.should.equal('This is the brand new grade!!!');
    });
  });

  describe('GET /api/grades/:id', function() {
    var grade;

    beforeEach(function(done) {
      request(app)
        .get(`/api/grades/${newGrade._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          grade = res.body;
          done();
        });
    });

    afterEach(function() {
      grade = {};
    });

    it('should respond with the requested grade', function() {
      grade.name.should.equal('New Grade');
      grade.info.should.equal('This is the brand new grade!!!');
    });
  });

  describe('PUT /api/grades/:id', function() {
    var updatedGrade;

    beforeEach(function(done) {
      request(app)
        .put(`/api/grades/${newGrade._id}`)
        .send({
          name: 'Updated Grade',
          info: 'This is the updated grade!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedGrade = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedGrade = {};
    });

    it('should respond with the original grade', function() {
      updatedGrade.name.should.equal('New Grade');
      updatedGrade.info.should.equal('This is the brand new grade!!!');
    });

    it('should respond with the updated grade on a subsequent GET', function(done) {
      request(app)
        .get(`/api/grades/${newGrade._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let grade = res.body;

          grade.name.should.equal('Updated Grade');
          grade.info.should.equal('This is the updated grade!!!');

          done();
        });
    });
  });

  describe('PATCH /api/grades/:id', function() {
    var patchedGrade;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/grades/${newGrade._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Grade' },
          { op: 'replace', path: '/info', value: 'This is the patched grade!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedGrade = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedGrade = {};
    });

    it('should respond with the patched grade', function() {
      patchedGrade.name.should.equal('Patched Grade');
      patchedGrade.info.should.equal('This is the patched grade!!!');
    });
  });

  describe('DELETE /api/grades/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/grades/${newGrade._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when grade does not exist', function(done) {
      request(app)
        .delete(`/api/grades/${newGrade._id}`)
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
