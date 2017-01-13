'use strict';

import routes from './dashboard.routes';
import DashboardController from './dashboard.controller';

export default angular.module('crmApp.dashboard', ['crmApp.auth', 'ui.router', 'vehicleCrmApp.pageTop'])
  .config(routes)
  .controller('DashboardController', DashboardController)
  .name;
