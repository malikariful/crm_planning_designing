'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider.state('employer', {
    url: '/employer',
    template: require('./employer.html'),
    controller: 'EmployerController',
    controllerAs: 'employer',
    authenticate: 'admin'
  });
};
