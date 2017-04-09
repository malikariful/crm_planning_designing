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
            controller: ['$rootScope', '$scope', 'close', 'Auth', 'User','$element',
                function ($rootScope, $scope, close, Auth, User, $element) {
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
                    $scope.createUser = function (editForm) {
                        if(editForm.$valid){
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
                                    $element.modal('hide');
                                    close(null, 500);
                                })
                                .catch(err => {
                                    err = err.data;
                                    $scope.errors = {};
                                    if (err.name) {
                                        angular.forEach(err.fields, function (field, key) {
                                            editForm[key].$setValidity('sequelize', false);
                                            $scope.errors[key] = err.message;
                                        }, this);
                                    }
                                    setTimeout(function(){
                                        $element.modal('hide');
                                        close(null, 200);
                                    }, 3000);
                                });
                        }
                    };
                }
            ]
        }).then(function (modal) {
            modal.element.modal();
            modal.close.then(function (result) {
            });

        }).catch(function(error) {
            console.log('error contains a detailed error message.');
            console.log(error);
        });

    };

}
