'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider.state('dashboard.admin', {
    url: '/dashboard.admin',
    template: require('./admin.html'),
    controller: 'AdminController',
    controllerAs: 'admin',
    authenticate: 'admin'
  });
};
