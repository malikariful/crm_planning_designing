'use strict';
const angular = require('angular');

/*@ngInject*/
export function modelService($resource) {
    'ngInject';

    return $resource('/api/vehicleModels/:id/:controller', {
        id: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}

export default angular.module('crm.modelService', [])
    .service('vehicleModelService', modelService)
    .name;
