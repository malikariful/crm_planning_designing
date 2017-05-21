'use strict';
const angular = require('angular');

/*@ngInject*/
export function jobCardService($resource) {
    'ngInject';

    return $resource('/api/jobs/:id/:controller', {
        id: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}

export default angular.module('crm.jobCardService', [])
    .service('jobCardService', jobCardService)
    .name;
