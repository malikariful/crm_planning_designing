'use strict';

import angularModalService from 'angular-modal-service';
import routes from './userManagement.routes';
import UserManagementController from './userManagement.controller';

export default angular.module('crmApp.userManagement', ['crmApp.auth', 'ui.router','angularModalService'])
  .config(routes)
  .controller('UserManagementController', UserManagementController)
  .name;
