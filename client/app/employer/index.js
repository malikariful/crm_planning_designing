'use strict';

import routes from './employer.routes';
import EmployerController from './employer.controller';
import EmployerSetUpController from './employerSetUp.controller';

export default angular.module('crmApp.employer', [])
  .config(routes)
  .controller('EmployerController', EmployerController)
  .controller('EmployerSetUpController', EmployerSetUpController)
  .name;
