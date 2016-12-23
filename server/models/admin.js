/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('admin', {
    admin_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    person_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'person',
        key: 'person_id'
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.CHAR(64),
      allowNull: false
    },
    retype_password: {
      type: DataTypes.CHAR(64),
      allowNull: true
    },
    contact_number: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'admin'
  });
};
