/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('problem_setup', {
    problem_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    problem_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    problem_description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    problem_charge: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'problem_setup'
  });
};
