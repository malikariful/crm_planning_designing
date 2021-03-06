'use strict';

describe('Directive: scrollPosition', function() {
  // load the directive's module
  beforeEach(module('vehicleCrmApp.scrollPosition'));

  var element,
    scope;

  beforeEach(inject(function($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function($compile) {
    element = angular.element('<scroll-position></scroll-position>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the scrollPosition directive');
  }));
});
