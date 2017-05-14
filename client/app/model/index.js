'use strict';

import routes from './model.routes';
import ModelController from './model.controller';

export default angular.module('crmApp.model', [])
    .config(routes)
    .controller('ModelController', ModelController)
    .name;
