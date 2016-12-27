/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('grade', {
    grade_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    grade_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    grade_description: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'grade'
  });
};
