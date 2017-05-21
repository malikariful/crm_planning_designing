'use strict';
import routes from './jobCard.routes';
import JobCardSetUpController from './jobCardSetUp.controller';
import JobCardController from './jobCard.controller';

export default angular.module('crmApp.jobCard', ['crmApp.auth', 'ui.router', 'smart-table'])
  .config(routes)
  .controller('JobCardSetUpController', JobCardSetUpController)
  .controller('JobCardController', JobCardController)
  .name;
