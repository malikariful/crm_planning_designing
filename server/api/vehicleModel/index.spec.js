'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var vehicleModelCtrlStub = {
  index: 'vehicleModelCtrl.index',
  show: 'vehicleModelCtrl.show',
  create: 'vehicleModelCtrl.create',
  upsert: 'vehicleModelCtrl.upsert',
  patch: 'vehicleModelCtrl.patch',
  destroy: 'vehicleModelCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var vehicleModelIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './vehicleModel.controller': vehicleModelCtrlStub
});

describe('VehicleModel API Router:', function() {
  it('should return an express router instance', function() {
    vehicleModelIndex.should.equal(routerStub);
  });

  describe('GET /api/vehicleModels', function() {
    it('should route to vehicleModel.controller.index', function() {
      routerStub.get
        .withArgs('/', 'vehicleModelCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/vehicleModels/:id', function() {
    it('should route to vehicleModel.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'vehicleModelCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/vehicleModels', function() {
    it('should route to vehicleModel.controller.create', function() {
      routerStub.post
        .withArgs('/', 'vehicleModelCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/vehicleModels/:id', function() {
    it('should route to vehicleModel.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'vehicleModelCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/vehicleModels/:id', function() {
    it('should route to vehicleModel.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'vehicleModelCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/vehicleModels/:id', function() {
    it('should route to vehicleModel.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'vehicleModelCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
