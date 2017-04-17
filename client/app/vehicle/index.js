'use strict';

import routes from './vehicle.routes';
import VehicleController from './vehicle.controller';
import VehicleSetUpController from './vehicleSetUp.controller';

export default angular.module('crmApp.vehicle', [])
  .config(routes)
  .controller('VehicleController', VehicleController)
  .controller('VehicleSetUpController', VehicleSetUpController)
  .name;
