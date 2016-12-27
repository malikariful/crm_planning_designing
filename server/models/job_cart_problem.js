/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('job_cart_problem', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    job_cart_problem_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'problem',
        key: 'problem_id'
      }
    },
    job_cart_problem_advice_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'problem',
        key: 'problem_id'
      }
    },
    job_cart_problem_mistry_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'employees_master',
        key: 'employee_master_id'
      }
    },
    job_cart_problem_receiver_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'employees_master',
        key: 'employee_master_id'
      }
    }
  }, {
    tableName: 'job_cart_problem'
  });
};
