'use strict';

export default class JobCardController {
    /*@ngInject*/

    constructor($scope, jobCardService, ModalService, vehicleService, employerService, problemService, $mdDialog) {
        this.$mdDialog = $mdDialog;
        this.ModalService = ModalService;
        this.jobs = jobCardService.query();
        this.problems = problemService.query();
        this.vehicles = vehicleService.query();
        this.employees = employerService.query();

        // console.log('jobs');
        // console.log(this.jobs);
    }

    showJob(job) {
        this.ModalService.showModal({
            templateUrl: 'showJob.html',
            controller: ['$scope', 'job', 'jobCardService', '$http', function ($scope, job, jobCardService, $http) {

                $scope.job = job;

                $http.get('http://localhost:8000/api/jobs/' + job._id + '/employee')
                    .then(function (response) {
                        $scope.job.employees = response.data;
                    });

                $http.get('http://localhost:8000/api/jobs/' + job._id + '/problem')
                    .then(function (response) {
                        $scope.job.problems = response.data;
                        console.log($scope.job);
                    });


            }],
            inputs: {
                job: job
            }
        }).then(function (modal) {
            modal.element.modal();
            modal.close.then(function (job) {
            });
        });
    }

    deleteJob = function (ev, job) {
        var confirm = this.$mdDialog.confirm()
            .title('Would you like to delete the job?')
            .textContent('All of the information will be gone.')
            .targetEvent(ev)
            .ok('Yes Please do it!')
            .cancel('No Sounds like a scam');

        this.$mdDialog.show(confirm).then(() => {
            job.$remove();
            this.jobs.splice(this.jobs.indexOf(job), 1);

        }, () => {
            this.$scope.status = 'You decided to keep your debt.';
        });
    };

    editJob = function (job) {
        this.ModalService.showModal({
            templateUrl: 'editJob.html',
            controller: ['$scope', 'job', 'jobCardService', '$mdToast', 'vehicles', 'employees', '$http', 'problems', function ($scope, job, jobCardService, $mdToast, vehicles, employees, $http, problems) {

                // console.log('job');
                // console.log('vehicles');
                // console.log(vehicles);
                // $scope.updateDealerFrom = function (ev, from) {
                //     if (from.$valid && from.$dirty) {
                //
                //         var dealerData = {
                //             dealer_name: $scope.dealer.dealer_name,
                //             dealer_email: $scope.dealer.dealer_email,
                //             dealer_phone: $scope.dealer.dealer_phone,
                //             dealer_type: 'permanent',
                //             dealer_address: $scope.dealer.dealer_address
                //         };
                //
                //         dealerService.update({
                //             id: $scope.dealer._id
                //         }, dealerData, response => {
                //             if (response.$resolved) {
                //                 $mdToast.show(
                //                     $mdToast.simple()
                //                         .textContent('Dealer has updated successfully!')
                //                         .position('bottom right')
                //                         .hideDelay(3000)
                //                 );
                //             }
                //         });
                //
                //     }
                //
                // };
                
                $scope.vehicles = vehicles;
                $scope.employees = employees;
                $scope.problems = problems;
                $scope.jobs = job;

                $http.get('http://localhost:8000/api/jobs/' + job._id + '/employee')
                    .then(function (response) {
                        $scope.jobs.employees = response.data;
                        $scope.selectedEmployee = $scope.jobs.employees;
                    });

                $http.get('http://localhost:8000/api/jobs/' + job._id + '/problem')
                    .then(function (response) {
                        $scope.jobs.problems = response.data;
                        $scope.selectedProblem = $scope.jobs.problems;
                    });


                $scope.selectedVehicle = [$scope.jobs.Vehicle_master];

                // console.log($scope.selectedEmployee);
                // console.log($scope.employees);



            }],
            inputs: {
                job: job,
                vehicles: this.vehicles,
                employees: this.employees,
                problems: this.problems
            }
        }).then(function (modal) {
            modal.element.modal();
            modal.close.then(function (job) {
            });
        });
    };

}

