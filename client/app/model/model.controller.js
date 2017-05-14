'use strict';

export default class ModelController {
    /*@ngInject*/
    constructor($scope, vehicleModelService, $mdDialog) {
        this.$scope = $scope;
        this.$mdDialog = $mdDialog;
        this.vehicleModelService = vehicleModelService;
    }

    createModel(form) {
        if (form.$valid) {
            this.vehicleModel = new this.vehicleModelService();
            this.vehicleModel.data = {
                vehicle_model_name: this.$scope.model.name
            };
            this.vehicleModel.$save()
                .then(res => {
                    if (res.$resolved) {
                        this.showAlert(res);
                    }
                })
                .catch(function (req) {
                    console.log("error saving obj");
                })
        }
    }

    showAlert(res) {
        alert = this.$mdDialog.alert({
            title: 'Model has created successfully',
            textContent: '',
            ok: 'Close'
        });

        this.$mdDialog
            .show(alert)
            .finally(function () {
                alert = undefined;
            });
    }

}
