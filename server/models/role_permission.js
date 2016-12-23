/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('role_permission', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    role_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'role',
        key: 'role_id'
      }
    },
    permission_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'permission',
        key: 'permission_id'
      }
    }
  }, {
    tableName: 'role_permission'
  });
};
