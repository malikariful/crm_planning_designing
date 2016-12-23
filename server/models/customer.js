/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('customer', {
    customer_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    customer_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    customer_area_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'area',
        key: 'area_id'
      }
    }
  }, {
    tableName: 'customer'
  });
};
