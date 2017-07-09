'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider.state('area', {
    url: '/area',
    template: require('./area.html'),
    controller: 'AreaController',
    controllerAs: 'area',
    authenticate: 'admin'
  });

  $stateProvider.state('areaSetUp', {
    url: '/areaSetUp',
    template: require('./areaSetUp.html'),
    controller: 'AreaSetUpController',
    controllerAs: 'areaSetUp',
    authenticate: 'admin'
  });
};
