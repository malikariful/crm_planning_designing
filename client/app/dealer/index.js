'use strict';

import routes from './dealer.routes';
import DealerController from './dealer.controller';

export default angular.module('crmApp.dealer', [])
  .config(routes)
  .controller('DealerController', DealerController)
  .name;
