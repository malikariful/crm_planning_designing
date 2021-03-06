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
  $stateProvider.state('saleNew', {
    url: '/saleNew',
    template: require('./saleNew.html'),
    controller: 'SaleNewController',
    controllerAs: 'saleNew',
    authenticate: 'admin'
  });
};
