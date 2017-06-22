'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider.state('sale', {
    url: '/sale',
    template: require('./sale.html'),
    controller: 'SaleController',
    controllerAs: 'sale',
    authenticate: 'admin'
  });
};
