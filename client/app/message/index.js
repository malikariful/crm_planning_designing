'use strict';

import routes from './message.routes';
import MessageController from './message.controller';

export default angular.module('crmApp.message', [])
    .config(routes)
    .controller('MessageController', MessageController)
    .name;
