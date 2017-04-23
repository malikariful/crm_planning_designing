'use strict';

export default class DealerSetUpController {
    /*@ngInject*/
    constructor($scope, dealerService) {
        this.$scope = $scope;
        this.dealerService = dealerService;
        this.dealer = dealerService.query();
        // this.dealerResourceObj =  new dealerService();
        $scope.project = {
            description: 'Nuclear Missile Defense System',
            rate: 500,
            special: true
        };
    }


    createDealer(form){
        if (form.$valid) {
            console.log(this.$scope.dealer);

            // return false;
            // console.log('Before inserting data to resource object');
            // console.log(this.dealerResourceObj);
            //
            // this.dealerResourceObj.data = this.$scope.dealer;
            // console.log('After inserting data to resource object');
            // console.log(this.dealerResourceObj);
            //dealer_name
            // return false;

            this.dealerService.save({
                dealer_name: this.$scope.dealer.dname,
                dealer_email: this.$scope.dealer.email,
                dealer_phone: this.$scope.dealer.phone,
                dealer_type: this.$scope.dealer.type,
                dealer_address: this.$scope.dealer.address
            }, function(response) {
                console.log(response);
            });
        }
    }


}
// address
//     :
//     "badda"
// dname
//     :
//     "tarek"
// email
//     :
//     "tarek@gmail.com"
// phone
//     :
//     "01711353535"
// type
//     :
//     "permanent"
// __proto__
//     :
//     Object