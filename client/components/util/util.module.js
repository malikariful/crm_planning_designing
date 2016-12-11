'use strict';

import {
  UtilService
} from './util.service';

export default angular.module('angularSeedApp.util', [])
  .factory('Util', UtilService)
  .name;
