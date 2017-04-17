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

  $stateProvider.state('employerSetUp', {
    url: '/employerSetUp',
    template: require('./employerSetUp.html'),
    controller: 'EmployerSetUpController',
    controllerAs: 'employerSetUp',
    authenticate: 'admin'
  });
};
