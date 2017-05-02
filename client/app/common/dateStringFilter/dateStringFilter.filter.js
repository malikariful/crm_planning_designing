'use strict';
const angular = require('angular');

/*@ngInject*/
export function dateStringFilter() {
  return function(input) {
      input=new Date(input).toUTCString();
      input=input.split(' ').slice(0, 4).join(' ')
    return `${input}`;
  };
}


export default angular.module('crmPlanningDesigningApp.dateStringFilter', [])
  .filter('dateStringFilter', dateStringFilter)
  .name;
