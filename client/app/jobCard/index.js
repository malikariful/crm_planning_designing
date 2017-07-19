'use strict';
import routes from './jobCard.routes';
// import JobCardSetUpController from './jobCardSetUp.controller';
import JobCardController from './jobCard.controller';

export default angular.module('crmApp.jobCard', ['crmApp.auth', 'ui.router', 'smart-table'])
    .config(routes)
    .controller('JobCardSetUpController', JobCardSetUpController)
    .controller('JobCardController', JobCardController)
    .name;


function JobCardSetUpController($scope, vehicleService, employerService, problemService, $filter, $timeout, $q, $log) {
    var self = this;

    self.searchEmployee = null;
    self.searchProblem = null;

    self.selectedEmployees = null;
    self.selectedProblems = null;

    self.vehicles = vehicleService.query();
    self.employees = employerService.query();
    self.problems = problemService.query();

    // console.log(self.vehicles);
    // console.log(self.employees);
    // console.log(self.problems);


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


    $scope.queryEmployees = function (search) {
        var firstPass = $filter('filter')(self.employees, search);
        return firstPass.filter(function (employee) {
            return $scope.selectedEmployees.indexOf(employee) === -1;
        });
    };

    $scope.addEmployees = function (employee) {
        $scope.selectedEmployees.push(employee.employee_name);
    };

    $scope.employees = self.employees;

    $scope.selectedEmployees = [self.employees[0]];

    $scope.$watchCollection('selectedEmployees', function () {
        $scope.availablEmployees = $scope.queryEmployees('');

    });

    
    $scope.queryProblems = function (search) {
        var firstPass = $filter('filter')(self.problems, search);
        return firstPass.filter(function (problem) {
            return $scope.selectedProblems.indexOf(problem) === -1;
        });
    };

    $scope.problems = self.problems;

    $scope.selectedProblems = [self.problems[0]];

}
