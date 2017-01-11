'use strict';

/**
 * Removes server error when user updates input
 */

angular.module('crmApp')
  .directive('sequelizeError', function() {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, element, attrs, ngModel) {
        element.on('keydown', () => ngModel.$setValidity('sequelize', true));
      }
    };
  });
