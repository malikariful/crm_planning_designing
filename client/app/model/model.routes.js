'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider.state('model', {
    url: '/model',
    template: require('./model.html'),
    controller: 'ModelController',
    controllerAs: 'model',
    authenticate: 'admin'
  });
};
