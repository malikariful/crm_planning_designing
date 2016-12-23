/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('arial_setup', {
    arial_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    arial_name: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'arial_setup'
  });
};
