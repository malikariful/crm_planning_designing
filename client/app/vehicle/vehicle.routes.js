'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider.state('vehicle', {
    url: '/vehicle',
    template: require('./vehicle.html'),
    controller: 'VehicleController',
    controllerAs: 'vehicle',
    authenticate: 'admin'
  });
};
