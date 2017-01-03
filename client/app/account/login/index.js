'use strict';

import LoginController from './login.controller';

export default angular.module('crmApp.login', [])
  .controller('LoginController', LoginController)
  .name;
