'use strict';

angular.module('myApp.auth')
    .factory("AuthInterceptor", function ($rootScope, $q, $cookies, $injector, Util) {
        return {
            // Add authorization token to headers
            request: function (config) {
                config.headers = config.headers || {};
                if ($cookies.get('token') && Util.isSameOrigin(config.url)) {
                    config.headers.Authorization = 'Bearer ' + $cookies.get('token');
                }
                return config;
            },
            // Intercept 401s and redirect you to login
            responseError: function (response) {
                if (response.status === 401) {
                    (state || (state = $injector.get('$state')))
                        .go('login');
                    // remove any stale tokens
                    $cookies.remove('token');
                }
                return $q.reject(response);
            }

        }
    });
