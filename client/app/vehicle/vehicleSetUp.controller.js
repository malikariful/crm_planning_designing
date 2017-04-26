'use strict';

export default class VehicleSetUpController {
    /*@ngInject*/
    constructor($scope, $state, dealerService, $mdDialog) {
        this.$state = $state;
        this.$scope = $scope;
        this.$mdDialog = $mdDialog;
        this.dealerService = new dealerService();
        this.dealer = dealerService.query();
    }
    
    createDealer(form) {
        if (form.$valid) {
            this.dealerService.data = {
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
            title: 'Dealer has created successfully',
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
