'use strict';
const angular = require('angular');

/*@ngInject*/
export function messageService($resource) {
    'ngInject';

    return $resource('/api/messages/:id/:controller', {
        id: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}

export default angular.module('crm.messageService', [])
  .service('messageService', messageService)
  .name;
