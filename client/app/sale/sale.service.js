'use strict';
const angular = require('angular');

/*@ngInject*/
export function saleService($resource) {
    'ngInject';

    return $resource('/api/sales/:id/:controller', {
        id: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}

export default angular.module('crm.saleService', [])
  .service('saleService', saleService)
  .name;
