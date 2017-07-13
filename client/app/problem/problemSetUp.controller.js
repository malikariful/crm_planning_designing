'use strict';

export default class EmployerSetUpController {
    /*@ngInject*/
    constructor($scope, $state, problemService, $mdDialog) {
        this.$state = $state;
        this.$scope = $scope;
        this.$mdDialog = $mdDialog;
        this.problemService = problemService;
    }

    createProblem(form) {
        if (form.$valid) {
            this.newProblem = new this.problemService();

            this.newProblem.data = {
                problem_name: this.$scope.problem.name,
                problem_description: this.$scope.problem.description,
                problem_fee: this.$scope.problem.fee
            };

            this.newProblem.$save()
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
            title: 'Problem has created successfully',
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
