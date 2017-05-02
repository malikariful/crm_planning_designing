'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var vehicleDetailCtrlStub = {
  index: 'vehicleDetailCtrl.index',
  show: 'vehicleDetailCtrl.show',
  create: 'vehicleDetailCtrl.create',
  upsert: 'vehicleDetailCtrl.upsert',
  patch: 'vehicleDetailCtrl.patch',
  destroy: 'vehicleDetailCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var vehicleDetailIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './vehicleDetail.controller': vehicleDetailCtrlStub
});

describe('VehicleDetail API Router:', function() {
  it('should return an express router instance', function() {
    vehicleDetailIndex.should.equal(routerStub);
  });

  describe('GET /api/vehicleDetails', function() {
    it('should route to vehicleDetail.controller.index', function() {
      routerStub.get
        .withArgs('/', 'vehicleDetailCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/vehicleDetails/:id', function() {
    it('should route to vehicleDetail.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'vehicleDetailCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/vehicleDetails', function() {
    it('should route to vehicleDetail.controller.create', function() {
      routerStub.post
        .withArgs('/', 'vehicleDetailCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/vehicleDetails/:id', function() {
    it('should route to vehicleDetail.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'vehicleDetailCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/vehicleDetails/:id', function() {
    it('should route to vehicleDetail.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'vehicleDetailCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/vehicleDetails/:id', function() {
    it('should route to vehicleDetail.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'vehicleDetailCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
