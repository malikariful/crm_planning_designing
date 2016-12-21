'use strict';
/*eslint no-process-env:0*/

// Development specific configuration
// ==================================
module.exports = {

  // Sequelize connection opions
  sequelize: {
    uri: 'mysql://root@127.0.0.1:3306/demo_crm',
    options: {
      logging: false,
      define: {
        timestamps: false
      },
      dialect:'mysql'
    }
  }
};
