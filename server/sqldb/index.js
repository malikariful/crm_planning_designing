/**
 * Sequelize initialization module
 */

'use strict';

import path from 'path';
import config from '../config/environment';
import Sequelize from 'sequelize';

var db = {
    Sequelize,
    sequelize: new Sequelize(config.sequelize.uri, config.sequelize.options)
};

db.sequelize.authenticate()
    .then(function (err) {
        console.log('Connection has been established successfully.');
    })
    .catch(function (err) {
        console.log('Unable to connect to the database:', err);
    });


// Insert models below
db.Role = db.sequelize.import('../api/role/role.model');
db.Area = db.sequelize.import('../api/area/area.model');
db.Permission = db.sequelize.import('../api/permission/permission.model');
db.Job = db.sequelize.import('../api/job/job.model');
db.Problem = db.sequelize.import('../api/problem/problem.model');
db.Grade = db.sequelize.import('../api/grade/grade.model');
db.Customer = db.sequelize.import('../api/customer/customer.model');
db.Designation = db.sequelize.import('../api/designation/designation.model');
db.Dealer = db.sequelize.import('../api/dealer/dealer.model');
db.Model = db.sequelize.import('../api/model/model.model');
db.Employee = db.sequelize.import('../api/employee/employee.model');
db.Vehicle = db.sequelize.import('../api/vehicle/vehicle.model');
db.User = db.sequelize.import('../api/user/user.model');
module.exports = db;
