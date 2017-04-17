'use strict';

export default class JobCardSetUpController {

  /*@ngInject*/
  constructor( $state, $scope) {
    this.$state = $state;
    this.myDate = new Date();
    this.isOpen = false;
    $scope.advices = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
    'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
    'WY').split(' ').map(function(advice) {
      return {abbrev: advice};
    });
    $scope.user = {
      name: 'John Doe',
      email: '',
      phone: '',
      address: 'Mountain View, CA',
      donation: 19.99
    };
  }

  register(form) {
    this.submitted = true;
    if (form.$valid) {
      console.log("job name is");
      console.log(this.job.name);
    }
  }
  changeAdvice(){
    console.log('user.advice');
    console.log(this.user.advice);

  }
}
