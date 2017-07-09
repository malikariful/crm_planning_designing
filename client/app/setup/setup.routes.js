'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider.state('setup', {
    url: '/setup',
    template: require('./setup.html'),
    controller: 'SetupController',
    controllerAs: 'setup',
    authenticate: 'admin'
  });
};
