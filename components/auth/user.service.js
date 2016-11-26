'use strict';

angular.module('myApp.auth')
    .factory("UserService", function () {

      var userService = {};

      /**
       * Create a new user
       *
       * @param  {Object}   user     - user info
       * @param  {Function} callback - function(error, user)
       * @return {Promise}
       */
      userService.createUser = function (user, callback) {

      }

      /**
       * Gets all available info on a user
       *
       * @param  {Function} [callback] - function(user)
       * @return {Promise}
       */
      userService.getCurrentUser = function (callback) {

      }

      return userService;
    });
