'use strict';

export default class JobCardSetUpController {

    /*@ngInject*/
    constructor($scope, $state, jobCardService, $timeout, $q, $log) {
        this.$scope = $scope;
        this.$state = $state;
        this.$timeout = $timeout;

        this.$q = $q;
        this.$log = $log;
        this.jobCardService = jobCardService;
        this.init();
    }

    init(){
        this.states = this.loadAll();

    }

    newState(state) {
        alert("Sorry! You'll need to create a Constitution for " + state + " first!");
    }

    querySearch(query) {
        var results = query ? this.states.filter(this.createFilterFor(query)) : this.states,
            deferred;
        if (this.simulateQuery) {
            deferred = $q.defer();
            $timeout(function () {
                deferred.resolve(results);
            }, Math.random() * 1000, false);
            return deferred.promise;
        } else {
            return results;
        }
    }

    searchTextChange(text) {
        console.log('searchTextChange');
    }

    selectedItemChange(item) {
        console.log('selectedItemChange');
    }

    loadAll() {
        var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,\
              Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
              Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
              Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
              North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
              South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
              Wisconsin, Wyoming';

        return allStates.split(/, +/g).map(function (state) {
            return {
                value: state.toLowerCase(),
                display: state
            };
        });
    }

    createFilterFor(query) {
        var lowercaseQuery = angular.lowercase(query);

        return function filterFn(state) {
            return (state.value.indexOf(lowercaseQuery) === 0);
        };

    }

    // createEmployer(form) {
    //     if (form.$valid) {
    //         this.newEmployer = new this.jobCardService();
    //
    //         this.newEmployer.data = {
    //             employee_name: this.$scope.employer.name,
    //             DesignationId: this.$scope.employer.designation
    //         };
    //
    //         this.newEmployer.$save()
    //             .then(res => {
    //                 if (res.$resolved) {
    //                     console.log("res saving obj");
    //                     console.log(res);
    //                     this.showAlert(res);
    //                 }
    //             })
    //             .catch(function (req) {
    //                 console.log("error saving obj");
    //             })
    //             .finally(function () {
    //                 console.log("always called")
    //             });
    //     }
    // }
    //
    // showAlert(res) {
    //     alert = this.$mdDialog.alert({
    //         title: 'Employer has created successfully',
    //         textContent: '',
    //         ok: 'Close'
    //     });
    //
    //     this.$mdDialog
    //         .show(alert)
    //         .finally(function () {
    //             alert = undefined;
    //         });
    // }
}


