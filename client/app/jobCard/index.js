'use strict';
import routes from './jobCard.routes';
// import JobCardSetUpController from './jobCardSetUp.controller';
import JobCardController from './jobCard.controller';

export default angular.module('crmApp.jobCard', ['crmApp.auth', 'ui.router', 'smart-table'])
    .config(routes)
    .controller('JobCardSetUpController', JobCardSetUpController)
    .controller('JobCardController', JobCardController)
    .directive('minItems', minItems)
    .name;

function minItems() {
    return {
        require: 'ngModel',
        restrict: 'A',
        link: function(scope, element, attr, ctrl) {
            var minItems = 0;

            attr.$observe('minItems', function(value) {
                console.log('value');
                console.log(value);
                minItems = parseInt(value, 10) || 0;
                ctrl.$validate();
            });

            ctrl.$validators['min-items'] = function(modelValue, viewValue) {
                return viewValue.length >= minItems;
            };

        }
    };
}

function JobCardSetUpController($scope, jobCardService, vehicleService, employerService, problemService, $filter, $timeout, $q, $log, $state, $mdDialog) {
    var self = this;

    self.searchEmployee = null;
    self.searchProblem = null;

    self.selectedEmployees = [];
    self.selectedProblems = [];

    self.vehicles = vehicleService.query();
    self.employees = employerService.query();
    self.problems = problemService.query();

    console.log(self.vehicles);
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
        if(selectedVehicle){
            self.selectedVehicleMasterId = selectedVehicle._id;
        }
    }

    function createFilterFor(query) {
        return function filterFn(vehicle) {
            return (vehicle.vehicle_master_engine_no.indexOf(query) === 0);
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

    $scope.createJobCard= function (jobCardForm) {

        let employeesId = self.selectedEmployees.map(function (employee) {
            return employee._id
        });

        let problemsId = self.selectedProblems.map(function (problem) {
            return problem._id

        });

        if (jobCardForm.$valid) {

            let newJobCard = {
                job_name: $scope.jobCard.name,
                job_reason: $scope.jobCard.reason,
                job_terms: $scope.jobCard.terms,
                job_fee: $scope.jobCard.fee,
                VehicleMasterId: self.selectedVehicleMasterId,
                employeeId: employeesId,
                problemId: problemsId
            };

            jobCardService.save(newJobCard, function(res) {
                if (res.$resolved) {
                    console.log("res saving obj");
                    console.log(res);
                    $scope.showAlert(res);
                }
            });

        }
    }

    $scope.showAlert = function(res) {
        alert = $mdDialog.alert({
            title: 'Job has created successfully',
            textContent: '',
            ok: 'Close'
        });

        $mdDialog
            .show(alert)
            .finally(function () {
                alert = undefined;
            });
        $state.go('jobCard');

    }
}


