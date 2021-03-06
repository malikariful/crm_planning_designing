'use strict';

export default class SignupController {

  /*@ngInject*/
  constructor( Auth, $state) {
    this.Auth = Auth;
    this.$state = $state;
  }

  register(form) {
    this.submitted = true;
    if (form.$valid) {
      if(this.user.confirmPassword !== this.user.password){
        form.confirmPassword.$error.match = true;
      }
      return this.Auth.createUser({
          name: this.user.name,
          email: this.user.email,
          password: this.user.password
        })
        .then(() => {
          // Account created, redirect to Dashboard
          this.$state.go('dashboard');
        })
        .catch(err => {
          err = err.data;
          this.errors = {};

          // Update validity of form fields that match the sequelize errors
          if (err.name) {
            angular.forEach(err.fields, function(field, key) {
              form[key].$setValidity('sequelize', false);
              this.errors[key] = err.message;

            }, this);
          }
        });
    }
  }
}
