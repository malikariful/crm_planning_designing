'use strict';

import routes from './sale.routes';
import SaleController from './sale.controller';
import SaleNewController from './saleNew.controller';

export default angular.module('crmApp.sale', [])
    .config(routes)
    .controller('SaleController', SaleController)
    .controller('SaleNewController', SaleNewController)
    .name;
