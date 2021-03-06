'use strict';

export default function (sequelize, DataTypes) {
    return sequelize.define('Vehicle_model', {
            _id: {
                type: DataTypes.INTEGER(11),
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            vehicle_model_name: {
                type: DataTypes.STRING,
                allowNull: false
            }
        }, {
            tableName: 'Vehicle_model'
        });
}
