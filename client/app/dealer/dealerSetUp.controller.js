'use strict';

export default class DealerSetUpController {
    /*@ngInject*/
    constructor($scope, dealerService) {
        this.$scope = $scope;
        // this.dealerService = dealerService;
        this.dealer = dealerService.query();
        this.dealerResourceObj =  new dealerService();
        $scope.project = {
            description: 'Nuclear Missile Defense System',
            rate: 500,
            special: true
        };
    }


    createDealer(form){
        if (form.$valid) {
            // console.log('Before inserting data to resource object');
            // console.log(this.dealerResourceObj);
            //
            // this.dealerResourceObj.data = this.$scope.dealer;
            // console.log('After inserting data to resource object');
            // console.log(this.dealerResourceObj);
            //
            // return false;

            this.dealerResourceObj.$save(this.$scope.dealer, function(response) {
                console.log(response);
            });
        }
    }


}
