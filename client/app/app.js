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


// import ngMessages from 'angular-messages';
//import ngValidationMatch from 'angular-validation-match';


import {
  routeConfig
} from './app.config';

import _Auth from '../components/auth/auth.module';
import account from './account';
import admin from './admin';
import dashboard from './dashboard';
import jobCard from './jobCard';
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
    _Auth, account, admin, dashboard, navbar, footer, main, constants, util, jobCard
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

//
// <script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular.min.js"></script>
//     <script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-animate.min.js"></script>
//     <script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-aria.min.js"></script>
//     <script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-messages.min.js"></script>
//
//     <!-- Angular Material Library -->

// <script src="http://ajax.googleapis.com/ajax/libs/angular_material/1.1.0/angular-material.min.js"></script>