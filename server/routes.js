/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';

export default function(app) {
  // Insert routes below
  app.use('/api/vehicleDetails', require('./api/vehicleDetail'));
  app.use('/api/vehicles', require('./api/vehicle'));
  app.use('/api/roles', require('./api/role'));
  app.use('/api/problems', require('./api/problem'));
  app.use('/api/permissions', require('./api/permission'));
  app.use('/api/vehicleModels', require('./api/vehicleModel'));
  app.use('/api/jobs', require('./api/job'));
  app.use('/api/grades', require('./api/grade'));
  app.use('/api/employees', require('./api/employee'));
  app.use('/api/designations', require('./api/designation'));
  app.use('/api/dealers', require('./api/dealer'));
  app.use('/api/customers', require('./api/customer'));
  app.use('/api/areas', require('./api/area'));
  app.use('/api/things', require('./api/thing'));
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
