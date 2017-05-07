'use strict';

export default class VehicleSetUpController {
    /*@ngInject*/
    constructor($rootScope, $scope, $state, vehicleService, vehicleDetailsService, vehicleModelService, dealerService, $mdDialog) {
        this.$state = $state;
        this.$rootScope = $rootScope;
        this.$scope = $scope;
        this.$mdDialog = $mdDialog;
        this.vehicleService = new vehicleService();
        this.vehicleDetailService = new vehicleDetailsService();

        this.vehicle = vehicleService.query();
        this.vehicleModels = vehicleModelService.query();
        this.vehicleDetail = vehicleDetailsService.query();


        this.dealers = dealerService.query();
    }

    createVehicle(form) {
        if (form.$valid) {
            this.vehicleService.data = {
                vehicle_master_chassis_no: this.$scope.vehicle.chassisNo,
                vehicle_master_engine_no: this.$scope.vehicle.engineNo,
                VehicleModelId: this.$scope.vehicle.selectedVehicleModel
            };
            this.vehicleDetailService.data = {
                vehicle_detail_name: this.$scope.vehicle.details,
                vehicle_detail_sales_date: this.$scope.vehicle.salesDate,
                vehicle_details_import_date: this.$scope.vehicle.importDate,
                vehicle_detail_allocated_service_date: this.$scope.vehicle.allocatedServiceDate,
                vehicle_detail_service_date: this.$scope.vehicle.servicingDate,
                vehicle_detail_last_grade: this.$scope.vehicle.grade,
                vehicle_details_total_free_service: this.$scope.vehicle.freeService,
                vehicle_detail_last_milage: this.$scope.vehicle.mileage,
                DealerId: this.$scope.vehicle.selectedDealer
            };

            this.vehicleService.$save()
                .then(res => {
                    if (res.$resolved) {
                        this.vehicleDetailService.data.VehicleMasterId = res._id;
                        this.vehicleDetailService.$save()
                            .then(res => {
                                if (res.$resolved) {
                                    console.log("res saving vehicle details obj");
                                    console.log(res);
                                    this.showAlert(res);
                                }
                            })
                            .catch(function (req) {
                                console.log("error saving obj");
                            })
                            .finally(function () {
                                console.log("always called")
                            });
                    }
                })
                .catch(function (req) {
                    console.log("error saving obj");
                })
                .finally(function () {
                    console.log("always called")
                });


        }
    }

    showAlert(res) {
        alert = this.$mdDialog.alert({
            title: 'vehicle has created successfully',
            textContent: '',
            ok: 'Close'
        });

        this.$mdDialog
            .show(alert)
            .finally(function () {
                alert = undefined;
            });
        this.$state.go('vehicle');

    }


}
