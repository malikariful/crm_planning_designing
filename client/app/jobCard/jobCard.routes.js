'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider.state('jobCardSetup', {
    url: '/jobCardSetup',
    template: require('./jobCardSetUp.html'),
    controller: 'JobCardSetUpController',
    controllerAs: 'jobCardSetUp',
    authenticate: 'admin'

  });
  $stateProvider.state('jobCard', {
    url: '/jobCard',
    template: require('./jobCard.html'),
    controller: 'JobCardController',
    controllerAs: 'jobCard',
    authenticate: 'admin'
  });
  
  
};
