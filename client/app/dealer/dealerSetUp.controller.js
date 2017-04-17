'use strict';

export default class DealerSetUpController {
    /*@ngInject*/
    constructor($scope) {
        this.$scope = $scope;

        $scope.project = {
            description: 'Nuclear Missile Defense System',
            rate: 500,
            special: true
        };

    }
}
