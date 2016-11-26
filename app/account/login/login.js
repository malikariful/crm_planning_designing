'use strict';

angular.module('myApp.account', ['ui.router', 'myApp.auth'])

.config(['$stateProvider', function($stateProvider) {

  var login = {
    name: 'login',
    url:'/login',
    templateUrl: 'account/login/login.html',
    controller: 'loginCtrl'
  };
  $stateProvider.state(login);


}])

.controller('loginCtrl', ['test', function(test) {
  // init();
  // function init() {
  //   test.sayTest();
  // }
}]);