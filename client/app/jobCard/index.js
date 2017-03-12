'use strict';
import routes from './jobCard.routes';
import JobCardController from './jobCard.controller';
import JobCardViewController from './jobCardView.controller';

export default angular.module('crmApp.jobCard', ['crmApp.auth', 'ui.router', 'smart-table'])
  .config(routes)
  .controller('JobCardController', JobCardController)
  .controller('JobCardViewController', JobCardViewController)
  .name;
