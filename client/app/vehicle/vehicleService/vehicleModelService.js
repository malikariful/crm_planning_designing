'use strict';
const angular = require('angular');

/*@ngInject*/
export function vehicleModelService($resource) {
    'ngInject';

    return $resource('/api/vehicleModels/:id/:controller', {
        id: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}

export default angular.module('crm.vehicleModelService', [])
    .service('vehicleModelService', vehicleModelService)
    .name;
