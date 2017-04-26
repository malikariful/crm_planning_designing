'use strict';
const angular = require('angular');

/*@ngInject*/
export function vehicleService($resource) {
    'ngInject';

    return $resource('/api/vehicles/:id/:controller', {
        id: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}

export default angular.module('crm.vehicleService', [])
  .service('vehicleService', vehicleService)
  .name;
