'use strict';

function removeTimeFromDate(input) {
    input = new Date(input).toUTCString();
    input = input.split(' ').slice(0, 4).join(' ')
    return `${input}`;
};

export default class VehicleController {
    /*@ngInject*/
    constructor($scope, vehicleService, $mdDialog, ModalService, vehicleDetailsService, dealerService) {
        this.itemsByPage = 10;
        this.vehicles = vehicleService.query();
        this.dealers = dealerService.query();

        this.$mdDialog = $mdDialog;
        this.$scope = $scope;
        this.ModalService = ModalService;

        this.vehicleDetail = vehicleDetailsService.query();
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
            controller: ['$scope', 'vehicle', 'vehicleService', 'vehicleDetailsService', 'vehicleModelService', '$mdToast', 'dealers', function ($scope, vehicle, vehicleService, vehicleDetailsService, vehicleModelService, $mdToast, dealers) {

                var vehicleDetailsId;
                $scope.Dealers = dealers;
                $scope.vehicle = vehicle;
                $scope.vehicleModels = vehicleModelService.query();

                vehicleDetailsService.get({id: $scope.vehicle._id}, function (vehicleDetail) {
                    console.log('vehicle details');
                    console.log(vehicleDetail);
                    $scope.vehicleDetail = vehicleDetail;
                    vehicleDetailsId = $scope.vehicleDetail._id;
                    $scope.vehicleDetail.vehicle_detail_allocated_service_date = removeTimeFromDate($scope.vehicleDetail.vehicle_detail_allocated_service_date);
                    $scope.vehicleDetail.vehicle_detail_sales_date = removeTimeFromDate($scope.vehicleDetail.vehicle_detail_sales_date);
                    $scope.vehicleDetail.vehicle_detail_service_date = removeTimeFromDate($scope.vehicleDetail.vehicle_detail_service_date);
                    $scope.vehicleDetail.vehicle_details_import_date = removeTimeFromDate($scope.vehicleDetail.vehicle_details_import_date);
                });

                $scope.updateVehicle = function (ev, from) {

                    if (from.$valid && from.$dirty) {

                        var vehicleData = {
                            vehicle_master_chassis_no: $scope.vehicle.vehicle_master_chassis_no,
                            vehicle_master_engine_no: $scope.vehicle.vehicle_master_engine_no,
                            VehicleModelId: $scope.vehicle.VehicleModelId
                        };
                        var vehicleDetailsData = {
                            vehicle_detail_name: $scope.vehicleDetail.vehicle_detail_name,
                            vehicle_detail_description: $scope.vehicleDetail.vehicle_detail_description,
                            vehicle_detail_sales_date: $scope.vehicleDetail.vehicle_detail_sales_date,
                            vehicle_details_import_date: $scope.vehicleDetail.vehicle_details_import_date,
                            vehicle_detail_last_grade: $scope.vehicleDetail.vehicle_detail_last_grade,
                            vehicle_details_total_free_service: $scope.vehicleDetail.vehicle_details_total_free_service,
                            vehicle_detail_free_service_status: $scope.vehicleDetail.vehicle_detail_free_service_status,
                            vehicle_detail_allocated_service_date: $scope.vehicleDetail.vehicle_detail_allocated_service_date,
                            vehicle_detail_service_date: $scope.vehicleDetail.vehicle_detail_service_date,
                            vehicle_detail_last_milage: $scope.vehicleDetail.vehicle_detail_last_milage,
                            DealerId: $scope.vehicleDetail.DealerId,
                            VehicleMasterId: $scope.vehicle._id
                        };

                        vehicleService.update({
                            id: $scope.vehicle._id
                        }, vehicleData, response => {
                            if (response.$resolved) {
                                vehicleDetailsService.update({
                                    id: vehicleDetailsId
                                }, vehicleDetailsData, response => {
                                    if (response.$resolved) {
                                        $mdToast.show(
                                            $mdToast.simple()
                                                .textContent('vehicle has updated successfully!')
                                                .position('bottom right')
                                                .hideDelay(3000)
                                        );
                                    } else {
                                        $mdToast.show(
                                            $mdToast.simple()
                                                .textContent('vehicle not updated')
                                                .position('bottom right')
                                                .hideDelay(3000)
                                        );
                                    }
                                });



                            }
                        });

                    }

                };

            }],
            inputs: {
                vehicle: vehicle,
                dealers: this.dealers
            }
        }).then(function (modal) {
            modal.element.modal();
            modal.close.then(function (vehicle) {
            });
        });
    };

}

