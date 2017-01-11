'use strict';

export default class SignupController {

  /*@ngInject*/
  constructor(Auth, $state) {
    this.Auth = Auth;
    this.$state = $state;
  }

  register(form) {
    this.submitted = true;
    if (form.$valid) {
      return this.Auth.createUser({
          name: this.user.name,
          email: this.user.email,
          password: this.user.password
        })
        .then(() => {
          // Account created, redirect to home
          alert("User has created successfully");
          this.$state.go('main');
        })
        .catch(err => {
          err = err.data;
          this.errors = {};

          // Update validity of form fields that match the sequelize errors
          // $scope.myForm.file.$setValidity("size", false);

          if (err.name) {
            console.log(err);
            angular.forEach(err.fields, field => {
              form[field].$setValidity('sequelize', false);
              this.errors[field] = err.message;
            });
          }
        });
    }
  }
}
