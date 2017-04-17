'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider.state('dealer', {
    url: '/dealer',
    template: require('./dealer.html'),
    controller: 'DealerController',
    controllerAs: 'dealer',
    authenticate: 'admin'
  });
};
