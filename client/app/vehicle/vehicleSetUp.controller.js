'use strict';

export default class VehicleSetUpController {
    /*@ngInject*/
    constructor($scope, $state, vehicleService, vehicleDetailsService, vehicleModelService, dealerService, $mdDialog) {
        this.$state = $state;
        this.$scope = $scope;
        this.$mdDialog = $mdDialog;
        this.vehicleService = new vehicleService();
        this.vehicle = vehicleService.query();
        this.myDate = new Date();
        this.isOpen = false;
        this.vehicleModels = vehicleModelService.query();
        this.vehicleDetail = vehicleDetailsService.query();
        console.log('vehicleDetail');
        console.log(this.vehicleDetail);
        this.dealers = dealerService.query();
    }
    
    createVehicle(form) {
        if (form.$valid) {

            console.log('Create Vehicle');
            console.log(this.$scope);

            return false;

            this.vehicleService.data = {
                dealer_name: this.$scope.dealer.dname,
                dealer_email: this.$scope.dealer.email,
                dealer_phone: this.$scope.dealer.phone,
                dealer_type: this.$scope.dealer.type,
                dealer_address: this.$scope.dealer.address
            };

            this.dealerService.$save()
                .then(res => {
                    if (res.$resolved) {
                        console.log("res saving obj");
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
        this.$state.go('dealer');

    }


}
