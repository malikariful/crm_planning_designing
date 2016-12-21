'use strict';

var app = require('../..');
import request from 'supertest';

var newTeam;

describe('Team API:', function() {
  describe('GET /api/teams', function() {
    var teams;

    beforeEach(function(done) {
      request(app)
        .get('/api/teams')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          teams = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      teams.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/teams', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/teams')
        .send({
          name: 'New Team',
          info: 'This is the brand new team!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newTeam = res.body;
          done();
        });
    });

    it('should respond with the newly created team', function() {
      newTeam.name.should.equal('New Team');
      newTeam.info.should.equal('This is the brand new team!!!');
    });
  });

  describe('GET /api/teams/:id', function() {
    var team;

    beforeEach(function(done) {
      request(app)
        .get(`/api/teams/${newTeam._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          team = res.body;
          done();
        });
    });

    afterEach(function() {
      team = {};
    });

    it('should respond with the requested team', function() {
      team.name.should.equal('New Team');
      team.info.should.equal('This is the brand new team!!!');
    });
  });

  describe('PUT /api/teams/:id', function() {
    var updatedTeam;

    beforeEach(function(done) {
      request(app)
        .put(`/api/teams/${newTeam._id}`)
        .send({
          name: 'Updated Team',
          info: 'This is the updated team!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedTeam = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedTeam = {};
    });

    it('should respond with the original team', function() {
      updatedTeam.name.should.equal('New Team');
      updatedTeam.info.should.equal('This is the brand new team!!!');
    });

    it('should respond with the updated team on a subsequent GET', function(done) {
      request(app)
        .get(`/api/teams/${newTeam._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let team = res.body;

          team.name.should.equal('Updated Team');
          team.info.should.equal('This is the updated team!!!');

          done();
        });
    });
  });

  describe('PATCH /api/teams/:id', function() {
    var patchedTeam;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/teams/${newTeam._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Team' },
          { op: 'replace', path: '/info', value: 'This is the patched team!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedTeam = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedTeam = {};
    });

    it('should respond with the patched team', function() {
      patchedTeam.name.should.equal('Patched Team');
      patchedTeam.info.should.equal('This is the patched team!!!');
    });
  });

  describe('DELETE /api/teams/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/teams/${newTeam._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when team does not exist', function(done) {
      request(app)
        .delete(`/api/teams/${newTeam._id}`)
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
