'use strict';

export default class DealerSetUpController {
    /*@ngInject*/
    constructor($scope, dealerService) {
        this.$scope = $scope;
        this.dealer = dealerService.query();
        console.log('Dealers');
        console.log(this.dealer);
        $scope.project = {
            description: 'Nuclear Missile Defense System',
            rate: 500,
            special: true
        };
    }


    createDealer(form){
        if (form.$valid) {
           console.log(this.$scope.dealer);
        }
    }
}
