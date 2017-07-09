'use strict';

export default class AreaSetUpController {
    /*@ngInject*/
    constructor($scope, $state, areaService,$mdDialog) {
        this.$state = $state;
        this.$scope = $scope;
        this.$mdDialog = $mdDialog;
        this.areaService = areaService;
        this.areas = areaService.query();
    }

    createArea(form) {
        if (form.$valid) {
            this.newArea = new this.areaService();

            this.newArea.data = {
                area_name: this.$scope.area.name,
                area_address: this.$scope.area.address
            };

            this.newArea.$save()
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
            title: 'Area has created successfully',
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
