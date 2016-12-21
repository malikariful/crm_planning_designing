'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var dashboardCtrlStub = {
  index: 'dashboardCtrl.index',
  show: 'dashboardCtrl.show',
  create: 'dashboardCtrl.create',
  upsert: 'dashboardCtrl.upsert',
  patch: 'dashboardCtrl.patch',
  destroy: 'dashboardCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var dashboardIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './dashboard.controller': dashboardCtrlStub
});

describe('Dashboard API Router:', function() {
  it('should return an express router instance', function() {
    dashboardIndex.should.equal(routerStub);
  });

  describe('GET /api/dashboards', function() {
    it('should route to dashboard.controller.index', function() {
      routerStub.get
        .withArgs('/', 'dashboardCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/dashboards/:id', function() {
    it('should route to dashboard.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'dashboardCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/dashboards', function() {
    it('should route to dashboard.controller.create', function() {
      routerStub.post
        .withArgs('/', 'dashboardCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/dashboards/:id', function() {
    it('should route to dashboard.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'dashboardCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/dashboards/:id', function() {
    it('should route to dashboard.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'dashboardCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/dashboards/:id', function() {
    it('should route to dashboard.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'dashboardCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
