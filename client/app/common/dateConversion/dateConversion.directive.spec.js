'use strict';

describe('Directive: dateConversion', function() {
  // load the directive's module
  beforeEach(module('crmPlanningDesigningApp.dateConversion'));

  var element,
    scope;

  beforeEach(inject(function($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function($compile) {
    element = angular.element('<date-conversion></date-conversion>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the dateConversion directive');
  }));
});
