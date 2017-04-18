'use strict';
const angular = require('angular');

/*@ngInject*/
export function dealerService($resource) {
    'ngInject';

    return $resource('/api/dealers/:id/:controller', {
        id: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}

export default angular.module('crm.dealerService', [])
  .service('dealerService', dealerService)
  .name;
