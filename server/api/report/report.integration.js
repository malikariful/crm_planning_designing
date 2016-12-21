'use strict';

var app = require('../..');
import request from 'supertest';

var newReport;

describe('Report API:', function() {
  describe('GET /api/reports', function() {
    var reports;

    beforeEach(function(done) {
      request(app)
        .get('/api/reports')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          reports = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      reports.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/reports', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/reports')
        .send({
          name: 'New Report',
          info: 'This is the brand new report!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newReport = res.body;
          done();
        });
    });

    it('should respond with the newly created report', function() {
      newReport.name.should.equal('New Report');
      newReport.info.should.equal('This is the brand new report!!!');
    });
  });

  describe('GET /api/reports/:id', function() {
    var report;

    beforeEach(function(done) {
      request(app)
        .get(`/api/reports/${newReport._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          report = res.body;
          done();
        });
    });

    afterEach(function() {
      report = {};
    });

    it('should respond with the requested report', function() {
      report.name.should.equal('New Report');
      report.info.should.equal('This is the brand new report!!!');
    });
  });

  describe('PUT /api/reports/:id', function() {
    var updatedReport;

    beforeEach(function(done) {
      request(app)
        .put(`/api/reports/${newReport._id}`)
        .send({
          name: 'Updated Report',
          info: 'This is the updated report!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedReport = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedReport = {};
    });

    it('should respond with the original report', function() {
      updatedReport.name.should.equal('New Report');
      updatedReport.info.should.equal('This is the brand new report!!!');
    });

    it('should respond with the updated report on a subsequent GET', function(done) {
      request(app)
        .get(`/api/reports/${newReport._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let report = res.body;

          report.name.should.equal('Updated Report');
          report.info.should.equal('This is the updated report!!!');

          done();
        });
    });
  });

  describe('PATCH /api/reports/:id', function() {
    var patchedReport;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/reports/${newReport._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Report' },
          { op: 'replace', path: '/info', value: 'This is the patched report!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedReport = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedReport = {};
    });

    it('should respond with the patched report', function() {
      patchedReport.name.should.equal('Patched Report');
      patchedReport.info.should.equal('This is the patched report!!!');
    });
  });

  describe('DELETE /api/reports/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/reports/${newReport._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when report does not exist', function(done) {
      request(app)
        .delete(`/api/reports/${newReport._id}`)
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
