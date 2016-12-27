/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('area', {
    area_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    area_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    area_address: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'area'
  });
};
