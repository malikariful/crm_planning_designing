'use strict';

import routes from './area.routes';
import AreaController from './area.controller';
import AreaSetUpController from './areaSetUp.controller';

export default angular.module('crmApp.area', [])
  .config(routes)
  .controller('AreaController', AreaController)
  .controller('AreaSetUpController', AreaSetUpController)
  .name;
