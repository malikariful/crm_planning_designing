'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider.state('dashboard.jobCard', {
    url: '/dashboard-jobCard',
    template: require('./jobCard.html'),
    controller: 'JobCardController',
    controllerAs: 'jobCard',
    authenticate: 'admin'
  });
  $stateProvider.state('dashboard.jobCardView', {
    url: '/dashboard-jobCardView',
    template: require('./jobCardView.html'),
    controller: 'JobCardViewController',
    controllerAs: 'jobCardView',
    authenticate: 'admin'
  });
  
  
};
