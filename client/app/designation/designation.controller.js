'use strict';

export default class DesignationController {
    /*@ngInject*/
    constructor($scope, designationService, $mdDialog) {
        this.$scope = $scope;
        this.$mdDialog = $mdDialog;
        this.designationService = designationService;
        this.designations = designationService.query();
        this.showCreateForm = false;
    }

    toggleCreateFormShow = function () {
        this.showCreateForm = !this.showCreateForm;
    }

    getDesignations = function () {
        this.designations = this.designationService.query();
    }

    createDesignation(form) {
        if (form.$valid) {
            this.designation = new this.designationService();

            this.designation.data = {
                designation_name: this.$scope.designation.name,
                designation_descriptions: this.$scope.designation.descriptions
            };
            this.designation.$save()
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

    deleteDesignation = function (ev, designation) {
        var confirm = this.$mdDialog.confirm()
            .title('Would you like to delete the designation?')
            .textContent('All of the information will be gone.')
            .targetEvent(ev)
            .ok('Yes Please do it!')
            .cancel('No Sounds like a scam');

        this.$mdDialog.show(confirm).then(() => {
            designation.$remove();
            this.designations.splice(this.designations.indexOf(designation), 1);
        }, () => {
            this.$scope.status = 'You decided to keep your debt.';
        });
    };

    showAlert(res) {
        alert = this.$mdDialog.alert({
            title: 'Designation has created successfully',
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
