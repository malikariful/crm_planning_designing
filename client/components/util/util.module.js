'use strict';

import {
  UtilService
} from './util.service';

export default angular.module('crmApp.util', [])
  .factory('Util', UtilService)
  .name;
