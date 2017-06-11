'use strict';

export default class JobCardController {
    /*@ngInject*/

    constructor($scope, jobCardService, ModalService, vehicleService, $mdDialog) {
        this.$mdDialog = $mdDialog;
        this.ModalService = ModalService;
        this.jobs = jobCardService.query();
        this.vehicles = vehicleService.query();

        // console.log('jobs');
        // console.log(this.jobs);
    }

    showJob(job) {
        this.ModalService.showModal({
            templateUrl: 'showJob.html',
            controller: ['$scope', 'job', 'jobCardService', '$http', function ($scope, job, jobCardService, $http) {

                $scope.job = job;
                console.log($scope.job._id);

                // jobCardService
                //     .get({id: $scope.vehicle._id})
                //     .$promise.then(
                //     function (vehicleDetail) {
                //         $scope.vehicleDetails = vehicleDetail;
                //     },
                //     function (error) {
                //         console.log('vehicle details error');
                //         console.log(error);
                //     }
                // );

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
            controller: ['$scope', 'job', 'jobCardService', '$mdToast', 'vehicles', function ($scope, job, jobCardService, $mdToast, vehicles) {

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
                $scope.jobs = job;


                $scope.selectedVehicle = [$scope.jobs.Vehicle_master];


            }],
            inputs: {
                job: job,
                vehicles: this.vehicles
            }
        }).then(function (modal) {
            modal.element.modal();
            modal.close.then(function (job) {
            });
        });
    };

}

