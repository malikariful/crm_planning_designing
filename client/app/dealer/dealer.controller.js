'use strict';

export default class DealerController {
    /*@ngInject*/
    constructor($scope, dealerService, $mdDialog, ModalService) {
        this.dealers = dealerService.query();
        this.$mdDialog = $mdDialog;
        this.$scope = $scope;
        this.ModalService = ModalService;



        this.user = {
            title: 'Developer',
            email: 'ipsum@lorem.com',
            firstName: '',
            lastName: '',
            company: 'Google',
            address: '1600 Amphitheatre Pkwy',
            city: 'Mountain View',
            state: 'CA',
            biography: 'Loves kittens, snowboarding, and can type at 130 WPM.\n\nAnd rumor has it she bouldered up Castle Craig!',
            postalCode: '94043'
        };

        this.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
        'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
        'WY').split(' ').map(function(state) {
            return {abbrev: state};
        });
    }

    removeItem(dealer) {
        dealer.$remove();
        this.dealers.splice(this.dealers.indexOf(dealer), 1);
    };

    deleteDealer = function (ev, dealer) {
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

    showDealer = function (dealer) {
        this.ModalService.showModal({
            templateUrl: 'showDealer.html',
            controller: ['$scope', 'dealer', function ($scope, dealer) {
                console.log('Inside controller show Dealer');
                console.log(dealer);
                $scope.dealer = dealer;
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

    editDealer = function (dealer) {
        console.log('edit dealer');
        console.log(dealer);
        this.ModalService.showModal({
            templateUrl: 'editDealer.html',
            controller: ['$scope', 'dealer', function ($scope, dealer) {
                console.log('Inside controller show Dealer');
                console.log(dealer);
                $scope.dealer = dealer;
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


// createdAt
//     :
//     "2017-04-24T10:26:02.000Z"
// dealer_address
//     :
//     "Badda"
// dealer_email
//     :
//     "sajal@gmail.com"
// dealer_name
//     :
//     "Sajal"
// dealer_phone
//     :
//     1913500623
// dealer_type
//     :
//     "permanent"
// updatedAt
//     :
//     "2017-04-24T10:26:02.000Z"
// _id
//     :
//     24