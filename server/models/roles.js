/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('roles', {
    role_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    role_name: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'roles'
  });
};
