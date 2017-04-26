'use strict';

import routes from './vehicle.routes';
import VehicleController from './vehicle.controller';
import VehicleSetUpController from './vehicleSetUp.controller';

export default angular.module('crmApp.vehicle', [])
    .config(routes)
    .config(['$mdThemingProvider', function ($mdThemingProvider) {
        $mdThemingProvider.theme('docs-dark', 'default')
            .primaryPalette('yellow')
            .dark();

    }])

    .controller('VehicleController', VehicleController)
    .controller('VehicleSetUpController', VehicleSetUpController)
    .name;
