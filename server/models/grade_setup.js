/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('grade_setup', {
    grade_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    grade_name: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'grade_setup'
  });
};
