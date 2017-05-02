'use strict';
const angular = require('angular');

export default angular.module('crmPlanningDesigningApp.dateConversion', [])
  .directive('dateConversion', function() {
    return {
      restrict: 'EA',
      require: 'ngModel',
      scope: {
          format: "="
      },
      link: function(scope, element, attrs, ngModelController, dateFilter) {
          
      }
    };
  })
  .name;
