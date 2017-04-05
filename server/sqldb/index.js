/**
 * Sequelize initialization module
 */

'use strict';

import path from 'path';
import config from '../config/environment';
import Sequelize from 'sequelize';

var db = {
  Sequelize,
  sequelize: new Sequelize('CRM', 'root', '1234567Asd#', {
    host: 'localhost',
    dialect: 'mysql',

    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
  })
};
db.sequelize.authenticate()
  .then(function (err) {
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('****************************************************');
    console.log('Unable to connect to the database:*************', err);
  });

// Insert models below
db.Vehicle = db.sequelize.import('../api/vehicle/vehicle.model');
db.Role = db.sequelize.import('../api/role/role.model');
db.Problem = db.sequelize.import('../api/problem/problem.model');
db.Permission = db.sequelize.import('../api/permission/permission.model');
db.VehicleModel = db.sequelize.import('../api/vehicleModel/vehicleModel.model');
db.Job = db.sequelize.import('../api/job/job.model');
db.Grade = db.sequelize.import('../api/grade/grade.model');
db.Employee = db.sequelize.import('../api/employee/employee.model');
db.Designation = db.sequelize.import('../api/designation/designation.model');
db.Dealer = db.sequelize.import('../api/dealer/dealer.model');
db.Customer = db.sequelize.import('../api/customer/customer.model');
db.Area = db.sequelize.import('../api/area/area.model');
db.Thing = db.sequelize.import('../api/thing/thing.model');
db.User = db.sequelize.import('../api/user/user.model');

db.CustomerVehicle = db.sequelize.import('ExtraDatabaseModel/customerVehicles.model');
db.VehicleDetails = db.sequelize.import('ExtraDatabaseModel/vehicleDetails.model');
db.JobCartProblems = db.sequelize.import('ExtraDatabaseModel/jobCartProblems.model');
db.RolePermissions = db.sequelize.import('ExtraDatabaseModel/rolePermissions.model');
// db.UserRole = db.sequelize.import('../ExtraDatabaseModel/userRoles.model'); not working
db.User.belongsToMany(db.Role, {
  through: 'UserRole'
}); // Not added into seed
db.Role.belongsToMany(db.User, {
  through: 'UserRole'
});

module.exports = db;
