'use strict';

export default class JobCardController {
    /*@ngInject*/

    constructor($scope, jobCardService) {
        this.jobs = jobCardService.query();
        console.log('jobs');
        console.log(this.jobs);

    }


}

