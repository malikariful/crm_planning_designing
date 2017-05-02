'use strict';
const angular = require('angular');

/*@ngInject*/
export function vehicleDetailsService($resource) {
    'ngInject';

    return $resource('/api/vehicleModels/:id/:controller', {
        id: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}

export default angular.module('crm.vehicleDetailsService', [])
    .service('vehicleDetailsService', vehicleDetailsService)
    .name;
