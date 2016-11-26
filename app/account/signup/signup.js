'use strict';

angular.module('myApp.account', ['ui.router', 'myApp.auth'])

    .config(['$stateProvider', function ($stateProvider) {

        var signup = {
            name: 'signup',
            url: '/signup',
            templateUrl: 'account/signup/signup.html',
            controller: 'signupCtrl'
        };
        $stateProvider.state(signup);


    }])

    .controller('signupCtrl', [function () {

    }]);