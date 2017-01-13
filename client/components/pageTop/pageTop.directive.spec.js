'use strict';

describe('Directive: pageTop', function() {
  // load the directive's module and view
  beforeEach(module('vehicleCrmApp.pageTop'));
  beforeEach(module('components/pageTop/pageTop.html'));

  var element, scope;

  beforeEach(inject(function($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function($compile) {
    element = angular.element('<page-top></page-top>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the pageTop directive');
  }));
});
