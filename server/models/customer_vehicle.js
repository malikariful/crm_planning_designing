/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('customer_vehicle', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    customer_vehicle_customer_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'customer',
        key: 'customer_id'
      }
    },
    customer_vehicle_vehicle_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'vehicle_master',
        key: 'vehicle_master_id'
      }
    }
  }, {
    tableName: 'customer_vehicle'
  });
};
