/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('problem', {
    problem_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    problem_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    problem_description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    problem_fee: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: "0"
    }
  }, {
    tableName: 'problem'
  });
};
