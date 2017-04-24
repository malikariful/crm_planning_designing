'use strict';

export default class DealerController {
    /*@ngInject*/
    constructor($scope, dealerService, $mdDialog) {
        this.dealers = dealerService.query();
        this.$mdDialog = $mdDialog;
        this.$scope = $scope;
    }

    removeItem(dealer) {
        dealer.$remove();
        this.dealers.splice(this.dealers.indexOf(dealer), 1);
    };

    showConfirm = function (ev, dealer) {
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

}
