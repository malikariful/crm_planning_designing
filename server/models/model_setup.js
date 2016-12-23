/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('model_setup', {
    model_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    model_name: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'model_setup'
  });
};
