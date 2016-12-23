'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var gradeCtrlStub = {
  index: 'gradeCtrl.index',
  show: 'gradeCtrl.show',
  create: 'gradeCtrl.create',
  upsert: 'gradeCtrl.upsert',
  patch: 'gradeCtrl.patch',
  destroy: 'gradeCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var gradeIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './grade.controller': gradeCtrlStub
});

describe('Grade API Router:', function() {
  it('should return an express router instance', function() {
    gradeIndex.should.equal(routerStub);
  });

  describe('GET /api/grades', function() {
    it('should route to grade.controller.index', function() {
      routerStub.get
        .withArgs('/', 'gradeCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/grades/:id', function() {
    it('should route to grade.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'gradeCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/grades', function() {
    it('should route to grade.controller.create', function() {
      routerStub.post
        .withArgs('/', 'gradeCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/grades/:id', function() {
    it('should route to grade.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'gradeCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/grades/:id', function() {
    it('should route to grade.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'gradeCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/grades/:id', function() {
    it('should route to grade.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'gradeCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
