'use strict';

angular.module('myApp.view2', ['ui.router'])

    .config(['$stateProvider', function ($stateProvider) {

        var viewTwoState = {
            name: 'view2',
            url: '/view2',
            template: '<h3>View from view2</h3>',
            controller: 'View2Ctrl'
        };
        $stateProvider.state(viewTwoState);

    }])

    .controller('View2Ctrl', [function () {

    }]);