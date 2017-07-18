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
import uiSelect from '../../node_modules/ui-select/index'
import datePicker from '../../node_modules/angularjs-datepicker/index'




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
import setup from './setup';
import vehicle from './vehicle';
import model from './model';
import jobCard from './jobCard';
import employer from './employer';
import designation from './designation';
import problem from './problem';
import designationService from './designation/designationService';
import dealerService from './dealer/dealerService/dealerService.service';
import problemService from './problem/problemService';
import vehiclesService from './vehicle/vehicleService/vehicleService.service';
import modelService from './model/modelService';
import vehicleDetailsService from './vehicle/vehicleService/vehicleDetailsService';
import employerService from './employer/employerService';
import jobCardService from './jobCard/jobCard.service';
import jobCardPropsFilter from './jobCard/propsFilter/propsFilter.filter';
import dealer from './dealer';
import sale from './sale';
import saleService from './sale/sale.service';
import customer from './customer';
import customeServicer from './customer/customer.service';
import message from './message';
import messageServicer from './message/message.service';
import area from './area';
import areaServicer from './area/area.service';
import navbar from '../components/navbar/navbar.component';
import footer from '../components/footer/footer.component';
import main from './main/main.component';
import constants from './app.constants';
import util from '../components/util/util.module';

import './app.css';


angular.module('crmApp', [
    // ngAnimate,
    ngCookies, ngResource, ngSanitize, uiRouter, angularAnimate, angularArea, angularMessage, angularMaterial,  smartTable, uiSelect, datePicker,
    // ngMessages,

    // ngValidationMatch,
    _Auth, account, admin, userManagement, dashboard, setup, navbar, footer, main, constants, util, dateConversionDirective, dateStringFilterModule, jobCard, area, message,
    vehicle, model, employer, designation, problem, customer, sale,
     dealerService, problemService, dealer, modelService, vehiclesService, vehicleDetailsService, employerService,
    designationService, jobCardService, jobCardPropsFilter, customeServicer, saleService, areaServicer, messageServicer
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

