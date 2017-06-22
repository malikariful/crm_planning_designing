'use strict';

import routes from './sale.routes';
import SaleController from './sale.controller';

export default angular.module('crmApp.sale', [])
    .config(routes)
    .controller('SaleController', SaleController)
    .name;
