'use strict';
const angular = require('angular');

/*@ngInject*/
export function dealerServiceService() {
	// AngularJS will instantiate a singleton by calling "new" on this function
}

export default angular.module('crm.dealerService', [])
  .service('dealerService', dealerServiceService)
  .name;
