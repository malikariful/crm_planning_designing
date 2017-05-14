'use strict';
const angular = require('angular');

/*@ngInject*/
export function employerService($resource) {
    'ngInject';

    return $resource('/api/employees/:id/:controller', {
        id: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}

export default angular.module('crm.employerService', [])
    .service('employerService', employerService)
    .name;
