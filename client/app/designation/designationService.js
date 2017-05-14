'use strict';
const angular = require('angular');

/*@ngInject*/
export function designationService($resource) {
    'ngInject';

    return $resource('/api/designations/:id/:controller', {
        id: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}

export default angular.module('crm.designationService', [])
    .service('designationService', designationService)
    .name;
