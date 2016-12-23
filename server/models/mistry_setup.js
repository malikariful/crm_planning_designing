/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('mistry_setup', {
    mistry_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    mistry_name: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'mistry_setup'
  });
};
