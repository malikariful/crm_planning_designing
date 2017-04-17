'use strict';

describe('Service: dealerService', function() {
  // load the service's module
  beforeEach(module('crm.dealerService'));

  // instantiate service
  var dealerService;
  beforeEach(inject(function(_dealerService_) {
    dealerService = _dealerService_;
  }));

  it('should do something', function() {
    expect(!!dealerService).toBe(true);
  });
});
