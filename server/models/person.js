/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('person', {
    person_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    is_admin: {
      type: DataTypes.INTEGER(1),
      allowNull: true
    },
    is_customer: {
      type: DataTypes.INTEGER(1),
      allowNull: true
    },
    is_user: {
      type: DataTypes.INTEGER(1),
      allowNull: true
    }
  }, {
    tableName: 'person'
  });
};
