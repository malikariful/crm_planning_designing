'use strict';

describe('Filter: dateStringFilter', function() {
  // load the filter's module
  beforeEach(module('crmPlanningDesigningApp.dateStringFilter'));

  // initialize a new instance of the filter before each test
  var dateStringFilter;
  beforeEach(inject(function($filter) {
    dateStringFilter = $filter('dateStringFilter');
  }));

  it('should return the input prefixed with "dateStringFilter filter:"', function() {
    var text = 'angularjs';
    expect(dateStringFilter(text)).toBe('dateStringFilter filter: ' + text);
  });
});
