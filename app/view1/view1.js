'use strict';

angular.module('myApp.view1', ['ui.router'])

.config(['$stateProvider', function($stateProvider) {

  var viewOneState = {
    name: 'view1',
    url:'/view1',
    template: '<h3>hello world! view1</h3>',
    controller: 'View1Ctrl'
  };
  $stateProvider.state(viewOneState);


}])

.controller('View1Ctrl', [function() {

}]);