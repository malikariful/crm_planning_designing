'use strict';

export default class ModelController {
    /*@ngInject*/
    constructor($scope, vehicleModelService, $mdDialog) {
        this.$scope = $scope;
        this.$mdDialog = $mdDialog;
        this.vehicleModelService = vehicleModelService;
        this.models = vehicleModelService.query();
        this.showCreateForm = false;
    }

    toggleCreateFormShow = function () {
        this.showCreateForm = !this.showCreateForm;
    }

    getModels = function () {
        this.models = this.vehicleModelService.query();
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

    deleteModel = function (ev, model) {
        var confirm = this.$mdDialog.confirm()
            .title('Would you like to model the model?')
            .textContent('All of the information will be gone.')
            .targetEvent(ev)
            .ok('Yes Please do it!')
            .cancel('No Sounds like a scam');

        this.$mdDialog.show(confirm).then(() => {
            model.$remove();
            this.models.splice(this.models.indexOf(model), 1);
        }, () => {
            this.$scope.status = 'You decided to keep your debt.';
        });
    };

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
