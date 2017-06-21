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

    removeItem(dealer) {
        dealer.$remove();
        this.dealers.splice(this.dealers.indexOf(dealer), 1);
    };

    deleteCustomer = function (ev, dealer) {
        var confirm = this.$mdDialog.confirm()
            .title('Would you like to delete the dealer?')
            .textContent('All of the information will be gone.')
            .targetEvent(ev)
            .ok('Yes Please do it!')
            .cancel('No Sounds like a scam');

        this.$mdDialog.show(confirm).then(() => {
            this.removeItem(dealer);
        }, () => {
            this.$scope.status = 'You decided to keep your debt.';
        });
    };
    
    editCustomer = function (dealer) {
        this.ModalService.showModal({
            templateUrl: 'editDealer.html',
            controller: ['$scope', 'dealer', 'dealerService', '$mdToast', function ($scope, dealer, dealerService, $mdToast) {
                $scope.dealer = dealer;

                $scope.updateDealerFrom = function (ev, from) {
                    if (from.$valid && from.$dirty) {

                        var dealerData = {
                            dealer_name: $scope.dealer.dealer_name,
                            dealer_email: $scope.dealer.dealer_email,
                            dealer_phone: $scope.dealer.dealer_phone,
                            dealer_type: 'permanent',
                            dealer_address: $scope.dealer.dealer_address
                        };

                        dealerService.update({
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
                dealer: dealer
            }
        }).then(function (modal) {
            modal.element.modal();
            modal.close.then(function (dealer) {
            });
        });
    };

}

