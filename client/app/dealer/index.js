'use strict';

import routes from './dealer.routes';
import DealerController from './dealer.controller';
import DealerSetUpController from './dealerSetUp.controller';

export default angular.module('crmApp.dealer', [])
  .config(routes)
  .controller('DealerController', DealerController)
  .controller('DealerSetUpController', DealerSetUpController)
  .name;
