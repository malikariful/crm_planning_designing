'use strict';

import routes from './designation.routes';
import DesignationController from './designation.controller';

export default angular.module('crmApp.designation', [])
    .config(routes)
    .controller('DesignationController', DesignationController)
    .name;
