'use strict';
const angular = require('angular');

/*@ngInject*/
export function customerService($resource) {
    'ngInject';

    return $resource('/api/customers/:id/:controller', {
        id: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}

export default angular.module('crm.customerService', [])
  .service('customerService', customerService)
  .name;
