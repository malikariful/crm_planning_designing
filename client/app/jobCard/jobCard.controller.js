'use strict';

export default class JobCardController {
    /*@ngInject*/

    constructor($scope, jobCardService, ModalService) {
        this.ModalService = ModalService;
        this.jobs = jobCardService.query();
        // console.log('jobs');
        // console.log(this.jobs);
    }

    showJob(job){
        this.ModalService.showModal({
            templateUrl: 'showJob.html',
            controller: ['$scope', 'job', 'jobCardService', function ($scope, job, jobCardService) {

                $scope.job = job;
                console.log($scope.job);

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


}

