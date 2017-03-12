'use strict';

export default class JobCardController {

  /*@ngInject*/
  constructor( $state) {
    this.$state = $state;
  }

  register(form) {
    this.submitted = true;
    if (form.$valid) {
      console.log("job name is");
      console.log(this.job.name);
    }
  }
}
