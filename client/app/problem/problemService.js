'use strict';
const angular = require('angular');

/*@ngInject*/
export function problemService($resource) {
    'ngInject';

    return $resource('/api/problems/:id/:controller', {
        id: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}

export default angular.module('crm.problemService', [])
    .service('problemService', problemService)
    .name;
