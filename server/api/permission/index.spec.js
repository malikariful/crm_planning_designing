'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var permissionCtrlStub = {
  index: 'permissionCtrl.index',
  show: 'permissionCtrl.show',
  create: 'permissionCtrl.create',
  upsert: 'permissionCtrl.upsert',
  patch: 'permissionCtrl.patch',
  destroy: 'permissionCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var permissionIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './permission.controller': permissionCtrlStub
});

describe('Permission API Router:', function() {
  it('should return an express router instance', function() {
    permissionIndex.should.equal(routerStub);
  });

  describe('GET /api/permissions', function() {
    it('should route to permission.controller.index', function() {
      routerStub.get
        .withArgs('/', 'permissionCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/permissions/:id', function() {
    it('should route to permission.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'permissionCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/permissions', function() {
    it('should route to permission.controller.create', function() {
      routerStub.post
        .withArgs('/', 'permissionCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/permissions/:id', function() {
    it('should route to permission.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'permissionCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/permissions/:id', function() {
    it('should route to permission.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'permissionCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/permissions/:id', function() {
    it('should route to permission.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'permissionCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
