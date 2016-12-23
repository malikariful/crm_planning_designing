/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('advice_setup', {
    advice_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    advice_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    advice_proceed_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    advice_promise_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    advice_pending: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'advice_setup'
  });
};
