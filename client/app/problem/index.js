'use strict';

import routes from './problem.routes';
import ProblemController from './problem.controller';
import ProblemSetUpController from './problemSetUp.controller';

export default angular.module('crmApp.problem', [])
  .config(routes)
  .controller('ProblemController', ProblemController)
  .controller('ProblemSetUpController', ProblemSetUpController)
  .name;
