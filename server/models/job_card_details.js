/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('job_card_details', {
    job_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'job_card',
        key: 'job_id'
      }
    },
    problem_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'problem_setup',
        key: 'problem_id'
      }
    },
    advice_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'advice_setup',
        key: 'advice_id'
      }
    },
    job_charge: {
      type: DataTypes.STRING,
      allowNull: true
    },
    job_terms: {
      type: DataTypes.STRING,
      allowNull: true
    },
    job_reason: {
      type: DataTypes.STRING,
      allowNull: true
    },
    job_date: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'job_card_details'
  });
};
