'use strict';

export default class DealerController {
    /*@ngInject*/
    constructor($scope, dealerService) {
        this.dealers = dealerService.query();
        this.$scope = $scope;
    }

    removeItem = function removeItem(dealer) {
        dealer.$remove();
        this.dealers.splice(this.dealers.indexOf(dealer), 1);
    }

}
