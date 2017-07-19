'use strict';
import routes from './jobCard.routes';
// import JobCardSetUpController from './jobCardSetUp.controller';
import JobCardController from './jobCard.controller';

export default angular.module('crmApp.jobCard', ['crmApp.auth', 'ui.router', 'smart-table'])
    .config(routes)
    .controller('JobCardSetUpController', JobCardSetUpController)
    .controller('JobCardController', JobCardController)
    .name;


function JobCardSetUpController($scope, vehicleService, $filter, $timeout, $q, $log) {
    var self = this;
    self.vehicles = vehicleService.query();
    console.log(self.vehicles);

    self.simulateQuery = false;
    self.isDisabled = false;

    self.querySearch = querySearch;
    self.selectedItemChange = selectedItemChange;
    self.searchTextChange = searchTextChange;


    function querySearch(query) {
        var results = query ? self.vehicles.filter(createFilterFor(query)) : self.vehicles,
            deferred;
        if (self.simulateQuery) {
            deferred = $q.defer();
            $timeout(function () {
                deferred.resolve(results);
            }, Math.random() * 1000, false);
            return deferred.promise;
        } else {
            return results;
        }
    }

    function searchTextChange(text) {
        // $log.info('Text changed to ' + text);
    }

    function selectedItemChange(selectedVehicle) {
        $log.info(selectedVehicle);
    }


    function createFilterFor(query) {
        return function filterFn(vehicle) {
            return (vehicle.Vehicle_model.vehicle_model_name.indexOf(query) === 0);
        };

    }


    var allGroups = [
        'one',
        'two',
        'three'
    ];

    $scope.queryGroups = function (search) {
        var firstPass = $filter('filter')(allGroups, search);

        return firstPass.filter(function (item) {
            return $scope.selectedGroups.indexOf(item) === -1;
        });
    };

    $scope.addGroup = function (group) {
        $scope.selectedGroups.push(group);
    };

    $scope.allGroups = allGroups;

    $scope.selectedGroups = [allGroups[0]];

    $scope.$watchCollection('selectedGroups', function () {
        $scope.availableGroups = $scope.queryGroups('');
    });
}
