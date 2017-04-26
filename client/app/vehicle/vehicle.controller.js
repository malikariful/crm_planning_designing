'use strict';

export default class VehicleController {
    /*@ngInject*/
    constructor($scope, vehicleService, $mdDialog, ModalService) {
        this.itemsByPage = 10;
        this.vehicles = vehicleService.query();
        console.log('this vehicles');
        console.log(this.vehicles);
        
        this.$mdDialog = $mdDialog;
        this.$scope = $scope;
        this.ModalService = ModalService;
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
            templateUrl: 'showDealer.html',
            controller: ['$scope', 'vehicle', function ($scope, vehicle) {
                console.log('Inside controller show vehicle');
                console.log(vehicle);
                $scope.vehicle = vehicle;
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
            controller: ['$scope', 'vehicle', 'vehicleService', '$mdToast', function ($scope, vehicle, vehicleService, $mdToast) {
                $scope.vehicle = vehicle;

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

// vehicle_master_chassis_no
//     :
//     "53346-1309"
// vehicle_master_engine_no
//     :
//     "11673-517"
// vehicle_master_id
//     :
//     6
// vehicle_master_model_id
//     :
//     1