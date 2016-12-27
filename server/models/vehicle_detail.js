/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('vehicle_detail', {
    vehicle_detail_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'vehicle_master',
        key: 'vehicle_master_id'
      }
    },
    vehicle_detail_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    vehicle_detail_description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    vehicle_detail_sales_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    vehicle_details_import_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    vehicle_detail_dealer_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'dealer',
        key: 'dealer_id'
      }
    },
    vehicle_detail_last_grade: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    vehicle_details_total_free_service: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    vehicle_detail_free_service_status: {
      type: DataTypes.INTEGER(1),
      allowNull: true
    },
    vehicle_detail_allocated_service_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    vehicle_detail_service_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    vehicle_detail_last_milage: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'vehicle_detail'
  });
};
