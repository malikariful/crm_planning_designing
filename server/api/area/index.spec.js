'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var areaCtrlStub = {
  index: 'areaCtrl.index',
  show: 'areaCtrl.show',
  create: 'areaCtrl.create',
  upsert: 'areaCtrl.upsert',
  patch: 'areaCtrl.patch',
  destroy: 'areaCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var areaIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './area.controller': areaCtrlStub
});

describe('Area API Router:', function() {
  it('should return an express router instance', function() {
    areaIndex.should.equal(routerStub);
  });

  describe('GET /api/areas', function() {
    it('should route to area.controller.index', function() {
      routerStub.get
        .withArgs('/', 'areaCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/areas/:id', function() {
    it('should route to area.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'areaCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/areas', function() {
    it('should route to area.controller.create', function() {
      routerStub.post
        .withArgs('/', 'areaCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/areas/:id', function() {
    it('should route to area.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'areaCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/areas/:id', function() {
    it('should route to area.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'areaCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/areas/:id', function() {
    it('should route to area.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'areaCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
