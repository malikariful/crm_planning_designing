'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider.state('message', {
    url: '/message',
    template: require('./message.html'),
    controller: 'MessageController',
    controllerAs: 'message',
    authenticate: 'admin'
  });
};
