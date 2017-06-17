'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var saleCtrlStub = {
  index: 'saleCtrl.index',
  show: 'saleCtrl.show',
  create: 'saleCtrl.create',
  upsert: 'saleCtrl.upsert',
  patch: 'saleCtrl.patch',
  destroy: 'saleCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var saleIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './sale.controller': saleCtrlStub
});

describe('Sale API Router:', function() {
  it('should return an express router instance', function() {
    saleIndex.should.equal(routerStub);
  });

  describe('GET /api/sales', function() {
    it('should route to sale.controller.index', function() {
      routerStub.get
        .withArgs('/', 'saleCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/sales/:id', function() {
    it('should route to sale.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'saleCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/sales', function() {
    it('should route to sale.controller.create', function() {
      routerStub.post
        .withArgs('/', 'saleCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/sales/:id', function() {
    it('should route to sale.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'saleCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/sales/:id', function() {
    it('should route to sale.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'saleCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/sales/:id', function() {
    it('should route to sale.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'saleCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
