'use strict';

import routes from './dealer.routes';
import DealerController from './dealer.controller';
import DealerSetUpController from './dealerSetUp.controller';

export default angular.module('crmApp.dealer', [])
    .config(routes)
    .config(['$mdThemingProvider', function ($mdThemingProvider) {

        // Configure a dark theme with primary foreground yellow

        $mdThemingProvider.theme('docs-dark', 'default')
            .primaryPalette('yellow')
            .dark();

        
    }])
    .controller('DealerController', DealerController)
    .controller('DealerSetUpController', DealerSetUpController)
    .name;
