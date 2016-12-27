/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('permission', {
    permission_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    permisson_name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'permission'
  });
};
