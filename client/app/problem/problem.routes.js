'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider.state('problem', {
    url: '/problem',
    template: require('./problem.html'),
    controller: 'ProblemController',
    controllerAs: 'problem',
    authenticate: 'admin'
  });

  $stateProvider.state('problemSetUp', {
    url: '/problemSetUp',
    template: require('./problemSetUp.html'),
    controller: 'ProblemSetUpController',
    controllerAs: 'problemSetUp',
    authenticate: 'admin'
  });
};
