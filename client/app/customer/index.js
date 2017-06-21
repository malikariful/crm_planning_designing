'use strict';

import routes from './customer.routes';
import CustomerController from './customer.controller';

export default angular.module('crmApp.customer', [])
    .config(routes)
    .controller('CustomerController', CustomerController)
    .name;
