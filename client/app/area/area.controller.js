'use strict';

export default class AreaController {
    /*@ngInject*/
    constructor($scope, areaService, $mdDialog, ModalService) {
        this.itemsByPage = 10;
        this.areas= areaService.query();
        this.areaService = areaService;
        this.$mdDialog = $mdDialog;
        this.$scope = $scope;
        this.ModalService = ModalService;
    }


    deleteArea = function (ev, area) {
        var confirm = this.$mdDialog.confirm()
            .title('Would you like to delete the area?')
            .textContent('All of the information will be gone.')
            .targetEvent(ev)
            .ok('Yes Please do it!')
            .cancel('No Sounds like a scam');

        this.$mdDialog.show(confirm).then(() => {
            area.$remove();
            this.areas.splice(this.areas.indexOf(area), 1);
        }, () => {
            this.$scope.status = 'You decided to keep your debt.';
        });
    };


    editArea = function (area) {

        this.ModalService.showModal({
            templateUrl: 'editArea.html',
            controller: ['$scope', '$mdToast', 'areaService', 'area', '$element', 'close', function ($scope, $mdToast, areaService, area, $element, close) {
                $scope.area = area;
                $scope.updateArea = function (ev, from) {

                    if (from.$valid && from.$dirty) {
                        var areaData = {
                            area_name: $scope.area.area_name,
                            area_address: $scope.area.area_address
                        };
                        areaService.update({
                            id: $scope.area._id
                        }, areaData, response => {
                            if (response.$resolved) {
                                $mdToast.show(
                                    $mdToast.simple()
                                        .textContent('area has updated successfully!')
                                        .position('bottom right')
                                        .hideDelay(3000)
                                );

                            }
                        });

                    }

                };
                $scope.close = function(result) {
                    close(areaService, 500);
                };

            }],
            inputs: {
                area: area
            }
        }).then(function (modal) {
            modal.element.modal();
            modal.close.then(function (areaService) {
                console.log('inside edit then');
                console.log(this);
            });
        });
    };

}

