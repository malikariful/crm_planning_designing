'use strict';

function removeTimeFromDate(input) {
    input=new Date(input).toUTCString();
    console.log('input');
    console.log(input);

    input=input.split(' ').slice(0, 4).join(' ')
    return `${input}`;
};

export default class VehicleController {
    /*@ngInject*/
    constructor($scope, vehicleService, $mdDialog, ModalService, vehicleDetailsService) {
        this.itemsByPage = 10;
        this.vehicles = vehicleService.query();

        this.$mdDialog = $mdDialog;
        this.$scope = $scope;
        this.ModalService = ModalService;

        this.vehicleDetail = vehicleDetailsService.query();
        this.myDate = new Date();


    }

    removeItem(vehicle) {
        vehicle.$remove();
        this.vehicles.splice(this.vehicles.indexOf(vehicle), 1);
    };

    deleteVehicle = function (ev, vehicle) {
        var confirm = this.$mdDialog.confirm()
            .title('Would you like to delete the vehicle?')
            .textContent('All of the information will be gone.')
            .targetEvent(ev)
            .ok('Yes Please do it!')
            .cancel('No Sounds like a scam');

        this.$mdDialog.show(confirm).then(() => {
            this.removeItem(vehicle);
        }, () => {
            this.$scope.status = 'You decided to keep your debt.';
        });
    };

    showVehicle = function (vehicle) {

        this.ModalService.showModal({
            templateUrl: 'showVehicle.html',
            controller: ['$scope', 'vehicle', 'vehicleDetailsService', function ($scope, vehicle, vehicleDetailsService) {
                $scope.vehicle = vehicle;
                vehicleDetailsService.get({id: $scope.vehicle._id}, function (vehicleDetail) {
                    $scope.vehicleDetails = vehicleDetail;
                });

            }],
            inputs: {
                vehicle: vehicle
            }
        }).then(function (modal) {
            modal.element.modal();
            modal.close.then(function (vehicle) {
            });
        });
    };

    editVehicle = function (vehicle) {
        this.ModalService.showModal({
            templateUrl: 'editVehicle.html',
            controller: ['$scope', 'vehicle', 'vehicleService', 'vehicleDetailsService', 'vehicleModelService', '$mdToast', function ($scope, vehicle, vehicleService, vehicleDetailsService, vehicleModelService, $mdToast) {

                $scope.vehicle = vehicle;

                vehicleDetailsService.get({id: $scope.vehicle._id}, function (vehicleDetail) {
                    $scope.vehicleDetail = vehicleDetail;
                    $scope.vehicleDetail.vehicle_detail_allocated_service_date = removeTimeFromDate($scope.vehicleDetail.vehicle_detail_allocated_service_date);
                    $scope.vehicleDetail.vehicle_detail_sales_date = removeTimeFromDate($scope.vehicleDetail.vehicle_detail_sales_date);
                    $scope.vehicleDetail.vehicle_detail_service_date = removeTimeFromDate($scope.vehicleDetail.vehicle_detail_service_date);
                    $scope.vehicleDetail.vehicle_details_import_date = removeTimeFromDate($scope.vehicleDetail.vehicle_details_import_date);
                    console.log('vehicleDetail');
                    console.log($scope.vehicleDetail.vehicle_details_import_date);

                });

                $scope.vehicleModels = vehicleModelService.query();

                $scope.updatevehicleFrom = function (ev, from) {
                    if (from.$valid && from.$dirty) {

                        var vehicleData = {
                            vehicle_name: $scope.vehicle.vehicle_name,
                            vehicle_email: $scope.vehicle.vehicle_email,
                            vehicle_phone: $scope.vehicle.vehicle_phone,
                            vehicle_type: 'permanent',
                            vehicle_address: $scope.vehicle.vehicle_address
                        };

                        vehicleService.update({
                            id: $scope.vehicle._id
                        }, vehicleData, response => {
                            if (response.$resolved) {
                                $mdToast.show(
                                    $mdToast.simple()
                                        .textContent('vehicle has updated successfully!')
                                        .position('bottom right')
                                        .hideDelay(3000)
                                );
                            }
                        });

                    }

                };

            }],
            inputs: {
                vehicle: vehicle
            }
        }).then(function (modal) {
            modal.element.modal();
            modal.close.then(function (vehicle) {
            });
        });
    };

}

