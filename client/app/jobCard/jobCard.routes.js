'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider.state('jobCardSetup', {
    url: '/jobCardSetup',
    template: require('./jobCardSetUp.html'),
    controller: 'JobCardSetUpController',
    controllerAs: 'jobCard',
    authenticate: 'admin'

  });
  $stateProvider.state('jobCard', {
    url: '/jobCard',
    template: require('./jobCardView.html'),
    controller: 'JobCardViewController',
    controllerAs: 'jobCardView',
    authenticate: 'admin'
  });
  
  
};
