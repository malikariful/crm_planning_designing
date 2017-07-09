'use strict';
const angular = require('angular');

/*@ngInject*/
export function areaService($resource) {
    'ngInject';

    return $resource('/api/areas/:id/:controller', {
        id: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}

export default angular.module('crm.areaService', [])
    .service('areaService', areaService)
    .name;
