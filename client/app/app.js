'use strict';

import angular from 'angular';
// import ngAnimate from 'angular-animate';
import ngCookies from 'angular-cookies';
import ngResource from 'angular-resource';
import ngSanitize from 'angular-sanitize';
import uiRouter from 'angular-ui-router';
import angularAnimate from 'angular-animate';
import angularArea from 'angular-aria';
import angularMessage from 'angular-messages';
import angularMaterial from 'angular-material';
import smartTable from 'angular-smart-table';
// import dataGrid from 'angular-data-grid';


import {
  routeConfig
} from './app.config';

import _Auth from '../components/auth/auth.module';
import dateConversionDirective from './common/dateConversion/dateConversion.directive';
import dateStringFilterModule from './common/dateStringFilter/dateStringFilter.filter';
import account from './account';
import admin from './admin';
import userManagement from './admin/userManagement';
import dashboard from './dashboard';
import vehicle from './vehicle';
import jobCard from './jobCard';
import employer from './employer';
import dealerService from './dealer/dealerService/dealerService.service';
import vehiclesService from './vehicle/vehicleService/vehicleService.service';
import vehicleModelService from './vehicle/vehicleService/vehicleModelService';
import vehicleDetailsService from './vehicle/vehicleService/vehicleDetailsService';
import dealer from './dealer';
import navbar from '../components/navbar/navbar.component';
import footer from '../components/footer/footer.component';
import main from './main/main.component';
import constants from './app.constants';
import util from '../components/util/util.module';

import './app.css';

angular.module('crmApp', [
    // ngAnimate,
    ngCookies, ngResource, ngSanitize, uiRouter, angularAnimate, angularArea, angularMessage, angularMaterial,  smartTable,
    // ngMessages,

    // ngValidationMatch,
    _Auth, account, admin, userManagement, dashboard, navbar, footer, main, constants, util, dateConversionDirective, dateStringFilterModule, jobCard, vehicle, employer,
     dealerService, dealer, vehicleModelService, vehiclesService, vehicleDetailsService
  ])
  .config(routeConfig)
  .run(function($rootScope, $location, Auth) {
    'ngInject';
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.loginStatus = false;
    $rootScope.$on('$stateChangeStart', function(event, next) {
      Auth.isLoggedIn(function(loggedIn) {
        if (next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });
    });
  });

angular.element(document)
  .ready(() => {
    angular.bootstrap(document, ['crmApp'], {
      strictDi: true
    });
  });
