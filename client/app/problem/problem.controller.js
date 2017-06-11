'use strict';

export default class ProblemController {
    /*@ngInject*/
    constructor($scope, problemService, $mdDialog, ModalService) {
        this.itemsByPage = 10;
        this.problems = problemService.query();
        console.log(this.problems);
        this.$mdDialog = $mdDialog;
        this.$scope = $scope;
        this.ModalService = ModalService;
    }
    

}

