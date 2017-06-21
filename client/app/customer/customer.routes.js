'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider.state('customer', {
    url: '/customer',
    template: require('./customer.html'),
    controller: 'CustomerController',
    controllerAs: 'customer',
    authenticate: 'admin'
  });
};
