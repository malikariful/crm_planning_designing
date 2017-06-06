'use strict';

export default class JobCardController {
    /*@ngInject*/

    constructor($scope, jobCardService, ModalService, $mdDialog) {
        this.$mdDialog = $mdDialog;
        this.ModalService = ModalService;
        this.jobs = jobCardService.query();
        // console.log('jobs');
        // console.log(this.jobs);
    }

    showJob(job){
        this.ModalService.showModal({
            templateUrl: 'showJob.html',
            controller: ['$scope', 'job', 'jobCardService','$http', function ($scope, job, jobCardService, $http) {

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

                $http.get('http://localhost:8000/api/jobs/' +job._id+ '/employee')
                    .then(function (response) {
                        $scope.job.employees = response.data;
                    });

                $http.get('http://localhost:8000/api/jobs/' +job._id+ '/problem')
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


}

