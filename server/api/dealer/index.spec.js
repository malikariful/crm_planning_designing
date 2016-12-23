'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var dealerCtrlStub = {
  index: 'dealerCtrl.index',
  show: 'dealerCtrl.show',
  create: 'dealerCtrl.create',
  upsert: 'dealerCtrl.upsert',
  patch: 'dealerCtrl.patch',
  destroy: 'dealerCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var dealerIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './dealer.controller': dealerCtrlStub
});

describe('Dealer API Router:', function() {
  it('should return an express router instance', function() {
    dealerIndex.should.equal(routerStub);
  });

  describe('GET /api/dealers', function() {
    it('should route to dealer.controller.index', function() {
      routerStub.get
        .withArgs('/', 'dealerCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/dealers/:id', function() {
    it('should route to dealer.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'dealerCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/dealers', function() {
    it('should route to dealer.controller.create', function() {
      routerStub.post
        .withArgs('/', 'dealerCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/dealers/:id', function() {
    it('should route to dealer.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'dealerCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/dealers/:id', function() {
    it('should route to dealer.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'dealerCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/dealers/:id', function() {
    it('should route to dealer.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'dealerCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
