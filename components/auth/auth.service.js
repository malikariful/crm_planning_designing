'use strict';

angular.module('myApp.auth', [])
    .factory("AuthService", function () {
        /**
         * Authenticate user and save token
         *
         * @param  {Object}   user     - login info
         */
        var authService = {};
        // var currentUser = {};
        //
        // if($cookies.get('token') && $location.path() !== '/logout') {
        //   currentUser = User.get();
        // }

        authService.login = function (email, password) {

        }

        /**
         * Delete access token and user info
         */
        authService.logout = function () {

        }

        /**
         * Check if a user has a specified role or higher
         *
         * @param  {String}     role     - the role to check against
         * @param  {Function} [callback] - function(has)
         * @return {Promise}
         */
        authService.hasRole = function () {

        }

        /**
         * Change password
         *
         * @param  {String}   oldPassword
         * @param  {String}   newPassword
         * @param  {Function} callback    - function(error, user)
         * @return {Promise}
         */
        authService.changePassword = function (oldPassword, newPassword, callback) {

        }

        /**
         * Check if a user is logged in
         *
         * @param  {Function} [callback] - function(is)
         * @return {Promise}
         */
        authService.isLoggedIn = function (callback) {

        }

        /**
         * Check if a user is an admin
         *   (synchronous|asynchronous)
         *
         * @param  {Function|*} callback - optional, function(is)
         * @return {Bool|Promise}
         */
        authService.isAdmin = function (callback) {

        }

        /**
         * Get auth token
         *
         * @return {String} - a token string used for authenticating
         */
        authService.getToken = function () {

        }

        return authService;
    });
