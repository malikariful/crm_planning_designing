'use strict';

import angular from 'angular';
import SettingsController from './settings.controller';

export default angular.module('vehicleServiceApp.settings', [])
  .controller('SettingsController', SettingsController)
  .name;
