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
db.Message = db.sequelize.import('../api/message/message.model');
db.Team = db.sequelize.import('../api/team/team.model');
db.Player = db.sequelize.import('../api/player/player.model');
db.Player.belongsTo(db.Team);

db.Report = db.sequelize.import('../api/report/report.model');
db.Dashboard = db.sequelize.import('../api/dashboard/dashboard.model');
db.User = db.sequelize.import('../api/user/user.model');

module.exports = db;
