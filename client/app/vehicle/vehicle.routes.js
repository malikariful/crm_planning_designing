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

  $stateProvider.state('vehicleSetUp', {
    url: '/vehicleSetUp',
    template: require('./vehicleSetUp.html'),
    controller: 'VehicleSetUpController',
    controllerAs: 'vehicleSetUp',
    authenticate: 'admin'
  });
};
