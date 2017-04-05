'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider.state('userManagement', {
    url: '/userManagement',
    template: require('./userManagement.html'),
    controller: 'UserManagementController',
    controllerAs: 'userManagement',
    authenticate: 'admin'
  });
};
