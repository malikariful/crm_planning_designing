'use strict';

angular.module('myApp.account', ['ui.router', 'myApp.auth'])

    .config(['$stateProvider', function ($stateProvider) {

        var setting = {
            name: 'setting',
            url: '/setting',
            templateUrl: 'account/settings/setting.html',
            controller: 'settingCtrl'
        };
        $stateProvider.state(setting);


    }])

    .controller('settingCtrl', [function () {

    }]);