// 'use strict';
//
// export default class JobCardSetUpController {
//
//     /*@ngInject*/
//     constructor($scope, $state, jobCardService, vehicleService, $timeout, $q, $log) {
//         this.$scope = $scope;
//         this.$state = $state;
//         this.jobCardService = jobCardService;
//         this.vehicles = vehicleService.query();
//
//         this.$timeout = $timeout;
//
//         this.$q = $q;
//         this.$log = $log;
//         this.init();
//         this.selectEmployee();
//     }
//
//     init() {
//         this.states = this.loadAll();
//     }
//
//
//     createJobCard(form) {
//         if (form.$valid) {
//             this.newJobCard = new this.jobCardService();
//
//             this.newJobCard.data = {
//                 job_name: this.$scope.jobCard.name,
//                 job_reason: this.$scope.jobCard.reason,
//                 job_terms: this.$scope.jobCard.terms,
//                 job_fee: this.$scope.jobCard.fee
//             };
//
//             this.newJobCard.$save()
//                 .then(res => {
//                     if (res.$resolved) {
//                         console.log("res saving obj");
//                         console.log(res);
//                         this.showAlert(res);
//                     }
//                 })
//                 .catch(function (req) {
//                     console.log("error saving obj");
//                 })
//                 .finally(function () {
//                     console.log("always called")
//                 });
//         }
//     }
//
//     showAlert(res) {
//         alert = this.$mdDialog.alert({
//             title: 'Job has created successfully',
//             textContent: '',
//             ok: 'Close'
//         });
//
//         this.$mdDialog
//             .show(alert)
//             .finally(function () {
//                 alert = undefined;
//             });
//     }
//
//     newState(state) {
//         alert("Sorry! You'll need to create a Constitution for " + state + " first!");
//     }
//
//     querySearch(query) {
//         var results = query ? this.states.filter(this.createFilterFor(query)) : this.states,
//             deferred;
//         if (this.simulateQuery) {
//             deferred = $q.defer();
//             $timeout(function () {
//                 deferred.resolve(results);
//             }, Math.random() * 1000, false);
//             return deferred.promise;
//         } else {
//             return results;
//         }
//     }
//
//     searchTextChange(text) {
//         console.log('searchTextChange');
//     }
//
//     selectedItemChange(item) {
//         console.log('selectedItemChange');
//     }
//
//     loadAll() {
//         var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,\
//               Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
//               Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
//               Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
//               North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
//               South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
//               Wisconsin, Wyoming';
//
//         return allStates.split(/, +/g).map(function (state) {
//             return {
//                 value: state.toLowerCase(),
//                 display: state
//             };
//         });
//     }
//    
// }
//
//
