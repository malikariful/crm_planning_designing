'use strict';

export default class CustomerController {
    /*@ngInject*/
    constructor($scope, customerService, $mdDialog, ModalService) {
        this.itemsByPage = 10;
        this.customers = customerService.query();
        this.$mdDialog = $mdDialog;
        this.$scope = $scope;
        this.ModalService = ModalService;
    }
    
    deleteCustomer = function (ev, customer) {
        var confirm = this.$mdDialog.confirm()
            .title('Would you like to delete the customer?')
            .textContent('All of the information will be gone.')
            .targetEvent(ev)
            .ok('Yes Please do it!')
            .cancel('No Sounds like a scam');

        this.$mdDialog.show(confirm).then(() => {
            customer.$remove();
            this.customers.splice(this.customers.indexOf(customer), 1);
        }, () => {
            this.$scope.status = 'You decided to keep your debt.';
        });
    };
    
    editCustomer = function (customer) {
        this.ModalService.showModal({
            templateUrl: 'editCustomer.html',
            controller: ['$scope', 'customer', 'customerService', '$mdToast', function ($scope, customer, customerService, $mdToast) {
                $scope.customer = customer;

                $scope.updateCustomerFrom = function (ev, from) {
                    if (from.$valid && from.$dirty) {

                        var dealerData = {
                            dealer_name: $scope.dealer.dealer_name,
                            dealer_email: $scope.dealer.dealer_email,
                            dealer_phone: $scope.dealer.dealer_phone,
                            dealer_type: 'permanent',
                            dealer_address: $scope.dealer.dealer_address
                        };

                        customerService.update({
                            id: $scope.dealer._id
                        }, dealerData, response => {
                            if (response.$resolved) {
                                $mdToast.show(
                                    $mdToast.simple()
                                        .textContent('Dealer has updated successfully!')
                                        .position('bottom right')
                                        .hideDelay(3000)
                                );
                            }
                        });

                    }

                };

            }],
            inputs: {
                customer: customer
            }
        }).then(function (modal) {
            modal.element.modal();
            modal.close.then(function (customer) {
            });
        });
    };

}

