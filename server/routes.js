/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';

export default function(app) {
  // Insert routes below
  app.use('/api/roles', require('./api/role'));
  app.use('/api/permissions', require('./api/permission'));
  app.use('/api/jobs', require('./api/job'));
  app.use('/api/problems', require('./api/problem'));
  app.use('/api/grades', require('./api/grade'));
  app.use('/api/customers', require('./api/customer'));
  app.use('/api/designations', require('./api/designation'));
  app.use('/api/dealers', require('./api/dealer'));
  app.use('/api/models', require('./api/model'));
  app.use('/api/employees', require('./api/employee'));
  app.use('/api/vehicles', require('./api/vehicle'));
  app.use('/api/messages', require('./api/message'));
  app.use('/api/teams', require('./api/team'));
  app.use('/api/players', require('./api/player'));
  app.use('/api/reports', require('./api/report'));
  app.use('/api/dashboards', require('./api/dashboard'));
  app.use('/api/users', require('./api/user'));

  app.use('/auth', require('./auth').default);

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
}
