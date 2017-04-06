'use strict';

export default class UserManagementController {
    /*@ngInject*/
    constructor(User, ModalService) {
        // Use the User $resource to fetch all users
        this.users = User.query();
        console.log(this.users);
        this.ModalService = ModalService;
    }

    delete(user) {
        user.$remove();
        this.users.splice(this.users.indexOf(user), 1);
    }

    showAModal = function () {
        this.ModalService.showModal({
            templateUrl: 'modal.html',
            controller: function () {

            }
        }).then(function (modal) {
            modal.element.modal();
            modal.close.then(function (result) {
                this.message = result ? "You said Yes" : "You said No";
            });
        });

    };
    createUser = function () {
        this.ModalService.showModal({
            templateUrl: 'createUser.html',
            controller: function () {

            }
        }).then(function (modal) {
            modal.element.modal();
            modal.close.then(function (result) {
                this.message = result ? "You said Yes" : "You said No";
            });
        });

    };

}
