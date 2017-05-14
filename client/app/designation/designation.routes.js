'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider.state('designation', {
    url: '/designation',
    template: require('./designation.html'),
    controller: 'DesignationController',
    controllerAs: 'designation',
    authenticate: 'admin'
  });
    
};
