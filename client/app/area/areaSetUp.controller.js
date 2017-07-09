'use strict';

export default class AreaSetUpController {
    /*@ngInject*/
    constructor($scope, $state, employerService, designationService, $mdDialog) {
        this.$state = $state;
        this.$scope = $scope;
        this.$mdDialog = $mdDialog;
        this.employerService = employerService;
        this.employees = employerService.query();
        this.designations = designationService.query();
    }

    createEmployer(form) {
        if (form.$valid) {
            this.newEmployer = new this.employerService();

            this.newEmployer.data = {
                employee_name: this.$scope.employer.name,
                DesignationId: this.$scope.employer.designation
            };

            this.newEmployer.$save()
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
            title: 'Employer has created successfully',
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
