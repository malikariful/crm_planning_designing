'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var modelCtrlStub = {
  index: 'modelCtrl.index',
  show: 'modelCtrl.show',
  create: 'modelCtrl.create',
  upsert: 'modelCtrl.upsert',
  patch: 'modelCtrl.patch',
  destroy: 'modelCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var modelIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './model.controller': modelCtrlStub
});

describe('Model API Router:', function() {
  it('should return an express router instance', function() {
    modelIndex.should.equal(routerStub);
  });

  describe('GET /api/models', function() {
    it('should route to model.controller.index', function() {
      routerStub.get
        .withArgs('/', 'modelCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/models/:id', function() {
    it('should route to model.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'modelCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/models', function() {
    it('should route to model.controller.create', function() {
      routerStub.post
        .withArgs('/', 'modelCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/models/:id', function() {
    it('should route to model.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'modelCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/models/:id', function() {
    it('should route to model.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'modelCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/models/:id', function() {
    it('should route to model.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'modelCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
