'use strict';

export default class UserManagementController {
    /*@ngInject*/
    constructor(User, ModalService, Auth, $rootScope) {
        this.$rootScope = $rootScope;
        this.Auth = Auth;
        this.$rootScope.users = User.query();
        this.ModalService = ModalService;
    }

    delete(user) {
        user.$remove();
        this.$rootScope.users.splice(this.$rootScope.users.indexOf(user), 1);
    }

    showAModal = function () {
        // this.ModalService.showModal({
        //     templateUrl: 'modal.html',
        //     controller: function () {
        //
        //     }
        // }).then(function (modal) {
        //     modal.element.modal();
        //     modal.close.then(function (user) {
        //     });
        // });

    };

    createUser = function () {
        this.ModalService.showModal({
            templateUrl: 'createUser.html',
            controller: ['$rootScope', '$scope', 'close', 'Auth', 'User',
                function ($rootScope, $scope, close, Auth, User) {
                    $scope.roles = [
                        {
                            "name": "admin"
                        },
                        {
                            "name": "user"
                        },
                        {
                            "name": "customer"
                        },
                        {
                            "name": "employee"
                        }
                    ];
                    $scope.createUser = function () {
                        return Auth.createUserFromManagement({
                            name: $scope.user.name,
                            firstName: $scope.user.firstName,
                            lastName: $scope.user.lastName,
                            email: $scope.user.email,
                            role: $scope.user.role[0].name,
                            password: '123456'
                        })
                            .then(() => {
                                $rootScope.users = User.query();
                                close(null, 500);

                            })
                            .catch(err => {
                                err = err.data;
                                this.errors = {};
                                if (err.name) {
                                    angular.forEach(err.fields, function (field, key) {
                                        form[key].$setValidity('sequelize', false);
                                        this.errors[key] = err.message;

                                    }, this);
                                }
                                close(null, 500);
                            });

                    };
                    $scope.close = function () {
                        close(null, 500);
                    };
                }
            ]

        }).then(function (modal) {
            modal.element.modal();
            modal.close.then(function (result) {
            });

        });

    };

}
