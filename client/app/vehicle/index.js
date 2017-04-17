'use strict';

import routes from './vehicle.routes';
import VehicleController from './vehicle.controller';

export default angular.module('crmApp.vehicle', [])
  .config(routes)
  .controller('VehicleController', VehicleController)
  .name;
