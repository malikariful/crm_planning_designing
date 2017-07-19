'use strict';
import routes from './jobCard.routes';
// import JobCardSetUpController from './jobCardSetUp.controller';
import JobCardController from './jobCard.controller';

export default angular.module('crmApp.jobCard', ['crmApp.auth', 'ui.router', 'smart-table'])
    .config(routes)
    .controller('JobCardSetUpController', JobCardSetUpController)
    .controller('JobCardController', JobCardController)
    .name;


function JobCardSetUpController($scope, $filter, $timeout, $q, $log) {
    var self = this;

    self.simulateQuery = false;
    self.isDisabled = false;

    self.states = loadAll();
    self.querySearch = querySearch;
    self.selectedItemChange = selectedItemChange;
    self.searchTextChange = searchTextChange;

    self.newState = newState;

    function newState(state) {
        alert("Sorry! You'll need to create a Constitution for " + state + " first!");
    }

    function querySearch(query) {
        var results = query ? self.states.filter(createFilterFor(query)) : self.states,
            deferred;
        if (self.simulateQuery) {
            deferred = $q.defer();
            $timeout(function () {
                deferred.resolve(results);
            }, Math.random() * 1000, false);
            return deferred.promise;
        } else {
            return results;
        }
    }

    function searchTextChange(text) {
        $log.info('Text changed to ' + text);
    }

    function selectedItemChange(item) {
        $log.info('Item changed to ' + JSON.stringify(item));
    }

    function loadAll() {
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

    function createFilterFor(query) {
        var lowercaseQuery = angular.lowercase(query);

        return function filterFn(state) {
            return (state.value.indexOf(lowercaseQuery) === 0);
        };

    }

    var allGroups = [
        'one',
        'two',
        'three'
    ];

    $scope.queryGroups = function(search) {
        var firstPass = $filter('filter')(allGroups, search);

        return firstPass.filter(function(item) {
            return $scope.selectedGroups.indexOf(item) === -1;
        });
    };

    $scope.addGroup = function(group) {
        $scope.selectedGroups.push(group);
    };

    $scope.allGroups = allGroups;

    $scope.selectedGroups = [allGroups[0]];

    $scope.$watchCollection('selectedGroups', function() {
        $scope.availableGroups = $scope.queryGroups('');
    });
}
