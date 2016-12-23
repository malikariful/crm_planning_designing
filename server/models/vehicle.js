/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('vehicle', {
    vehicle_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    model_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'model_setup',
        key: 'model_id'
      }
    },
    chasis_no: {
      type: DataTypes.STRING,
      allowNull: true
    },
    engine_no: {
      type: DataTypes.STRING,
      allowNull: false
    },
    vehicle_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    vehicle_sales_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    vehicle_import_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    vehicle_last_milage: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    vehicle_last_grade: {
      type: DataTypes.STRING,
      allowNull: true
    },
    vehicle_dealer_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    vehiclec_number_of_free_service: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    vehicle_free_service_status: {
      type: DataTypes.INTEGER(1),
      allowNull: true
    },
    vehiclec_alocated_service_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    vehiclec_service_date: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'vehicle'
  });
};
