'use strict';
const angular = require('angular');

export default angular.module('vehicleCrmApp.pageTop', [])
  .directive('pageTop', function() {
    return {
      templateUrl: 'components/pageTop/pageTop.html',
      restrict: 'E',
      link: function(scope, element, attrs) {}
    };
  })
  .name;
