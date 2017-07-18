'use strict';

export default class SaleNewController {
    /*@ngInject*/
    constructor($rootScope, $scope, $state, employerService, vehicleModelService, areaService, saleService, $mdDialog) {
        this.$state = $state;
        this.$rootScope = $rootScope;
        this.$scope = $scope;
        this.$mdDialog = $mdDialog;
        this.employees = employerService.query();
        this.models = vehicleModelService.query();
        this.areas = areaService.query();

        this.saleService = new saleService();
        this.$scope.customer = {
            freeServiceNumber: 4
        };
        this.$scope.sales_date = new Date();
        this.$scope.actualPrice = 0;
        this.$scope.colors = [
            {
                _id: 1,
                name: "Red"
            },
            {
                _id: 2,
                name: "Blue"
            },
            {
                _id: 3,
                name: "Black"
            },
            {
                _id: 4,
                name: "Gray"
            },
            {
                _id: 5,
                name: "White"
            },
            {
                _id: 6,
                name: "Green"
            }
        ];
        this.$scope.paymentMethod = {
            cash: 'cash',
            credit: 'credit'
        };

    }

    createVehicle(form) {
        if (form.$valid) {
            this.vehicleService.data = {
                vehicle_master_chassis_no: this.$scope.vehicle.chassisNo,
                vehicle_master_engine_no: this.$scope.vehicle.engineNo,
                VehicleModelId: this.$scope.vehicle.selectedVehicleModel
            };
            this.vehicleDetailService.data = {
                vehicle_detail_name: this.$scope.vehicle.details,
                vehicle_detail_sales_date: this.$scope.vehicle.salesDate,
                vehicle_details_import_date: this.$scope.vehicle.importDate,
                vehicle_detail_allocated_service_date: this.$scope.vehicle.allocatedServiceDate,
                vehicle_detail_service_date: this.$scope.vehicle.servicingDate,
                vehicle_detail_last_grade: this.$scope.vehicle.grade,
                vehicle_details_total_free_service: this.$scope.vehicle.freeService,
                vehicle_detail_last_milage: this.$scope.vehicle.mileage,
                DealerId: this.$scope.vehicle.selectedDealer
            };

            this.vehicleService.$save()
                .then(res => {
                    if (res.$resolved) {
                        this.vehicleDetailService.data.VehicleMasterId = res._id;
                        this.vehicleDetailService.$save()
                            .then(res => {
                                if (res.$resolved) {
                                    console.log("res saving vehicle details obj");
                                    console.log(res);
                                    this.showAlert(res);
                                }
                            })
                            .catch(function (req) {
                                console.log("error saving obj");
                            })
                            .finally(function () {
                                console.log("always called")
                            });
                    }
                })
                .catch(function (req) {
                    console.log("error saving obj");
                })
                .finally(function () {
                    console.log("always called")
                });


        }
    }

    showAlert(res) {
        alert = this.$mdDialog.alert({
            title: 'vehicle has created successfully',
            textContent: '',
            ok: 'Close'
        });

        this.$mdDialog
            .show(alert)
            .finally(function () {
                alert = undefined;
            });
        this.$state.go('vehicle');

    }

    newSale(form) {
        if (form.$valid) {

            this.saleService.EmployeeId = this.$scope.selectedEmployer;
            this.saleService.description = this.$scope.saleDescriptions;

            this.saleService.Customer = {
                customer_name: this.$scope.customer.customerName,
                customer_phone: this.$scope.customer.customerPhone,
                customer_address: this.$scope.customer.customerAddress,
                free_service_number: this.$scope.customer.freeServiceNumber,
                AreaId: this.$scope.selectedArea
            };

            this.saleService.Vehicle = {
                vehicle_master_chassis_no: this.$scope.vehicle.chassisNo,
                vehicle_master_engine_no: this.$scope.vehicle.engineNo,
                number_of_servicing: 0,
                vehicle_color: this.$scope.vehicle.selectedColor,
                VehicleModelId: this.$scope.vehicle.selectedModel
            };

            this.saleService.SalesDetails = {
                price: this.$scope.salesDetails.price,
                discount: this.$scope.salesDetails.discount,
                down_payment: this.$scope.salesDetails.downPayment || 0,
                due_payment: (this.$scope.salesDetails.price - this.$scope.salesDetails.discount) - this.$scope.salesDetails.downPayment || 0,
                internal_reference: this.$scope.salesDetails.internalReference,
                payment_method: this.$scope.paymentMethod.cash,
                sales_date: this.$scope.sales_date,
                credit_start_date: this.$scope.salesDetails.creditStartDate || null,
                credit_end_date: this.$scope.salesDetails.creditEndDate || null
            };
            
            console.log('Prepared Data');
            console.log(this.saleService);

 ;

            this.saleService.$save()
                .then(res => {
                    if (res.$resolved) {
                        this.showAlert(res);
                    }
                })
                .catch(function (req) {
                    console.log("error saving obj");
                })
                .finally(function () {
                    console.log("always called")
                });


        }
    }

    showAlert(res) {
        alert = this.$mdDialog.alert({
            title: 'Sell has successfully',
            textContent: '',
            ok: 'Close'
        });

        this.$mdDialog
            .show(alert)
            .finally(function () {
                alert = undefined;
            });
        this.$state.go('sale');

    }

}

