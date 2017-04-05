'use strict';

export default class UserManagementController {
    /*@ngInject*/
    constructor(ModalService) {
        this.ModalService = ModalService;
        // Use the User $resource to fetch all users
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

}
