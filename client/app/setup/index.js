'use strict';

import routes from './setup.routes';
import SetupController from './setup.controller';

export default angular.module('crmApp.setup', ['crmApp.auth', 'ui.router'])
  .config(routes)
  .controller('SetupController', SetupController)
  .name;
