'use strict';
function removeTimeFromDate(input) {
    input = new Date(input).toUTCString();
    input = input.split(' ').slice(0, 4).join(' ');
    return `${input}`;
};

export default class EmployerController {
    /*@ngInject*/
    constructor($scope, employerService, $mdDialog, ModalService) {
        this.itemsByPage = 10;
        this.employees = employerService.query();
        this.employerService = employerService;
        this.$mdDialog = $mdDialog;
        this.$scope = $scope;
        this.ModalService = ModalService;
    }


    deleteEmployer = function (ev, employer) {
        var confirm = this.$mdDialog.confirm()
            .title('Would you like to delete the vehicle?')
            .textContent('All of the information will be gone.')
            .targetEvent(ev)
            .ok('Yes Please do it!')
            .cancel('No Sounds like a scam');

        this.$mdDialog.show(confirm).then(() => {
            employer.$remove();
            this.employees.splice(this.employees.indexOf(employer), 1);
        }, () => {
            this.$scope.status = 'You decided to keep your debt.';
        });
    };


    editEmployer = function (employer) {

        this.ModalService.showModal({
            templateUrl: 'editEmployer.html',
            controller: ['$scope', '$mdToast', 'employerService', 'employer', 'designationService', '$element', 'close', function ($scope, $mdToast, employerService, employer, designationService, $element, close) {
                $scope.employer = employer;
                $scope.designations = designationService.query();
                $scope.updateEmployer = function (ev, from) {

                    if (from.$valid && from.$dirty) {
                        var employerData = {
                            employee_name: $scope.employer.employee_name,
                            DesignationId: $scope.employer.DesignationId
                        };
                        employerService.update({
                            id: $scope.employer._id
                        }, employerData, response => {
                            if (response.$resolved) {
                                $mdToast.show(
                                    $mdToast.simple()
                                        .textContent('employer has updated successfully!')
                                        .position('bottom right')
                                        .hideDelay(3000)
                                );

                            }
                        });

                    }

                };
                $scope.close = function(result) {
                    close(employerService, 500);
                };

            }],
            inputs: {
                employer: employer
            }
        }).then(function (modal) {
            modal.element.modal();
            modal.close.then(function (employerService) {
            });
        });
    };

}

