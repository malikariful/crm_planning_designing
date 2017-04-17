'use strict';

import routes from './employer.routes';
import EmployerController from './employer.controller';

export default angular.module('crmApp.employer', [])
  .config(routes)
  .controller('EmployerController', EmployerController)
  .name;
