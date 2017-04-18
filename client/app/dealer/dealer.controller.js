'use strict';

export default class DealerController {
    /*@ngInject*/
    constructor($scope, dealerService) {
        this.dealers = dealerService.query();
        this.$scope = $scope;

    }

    removeItem = function removeItem(row) {
        var index = this.dealers.indexOf(row);
        if (index !== -1) {
            this.dealers.splice(index, 1);
        }
    }

}
