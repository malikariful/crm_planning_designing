/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('employees_master', {
    employee_master_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    employee_master_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    employee_master_designation_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'designation',
        key: 'designation_id'
      }
    }
  }, {
    tableName: 'employees_master'
  });
};
