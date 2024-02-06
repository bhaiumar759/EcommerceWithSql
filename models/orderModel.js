var { DataTypes } = require('sequelize');

const OrderModel = {

    id: {
        type: DataTypes.INTEGER(11),
        autoIncrement: true,
        primaryKey: true
    },


    tracking_number: {
        type: DataTypes.STRING(255),
        unique: true,
        allowNull: false

    },


    order_status: {
        type: DataTypes.INTEGER(11),
        allowNull: false
    },


    total: {
        type: DataTypes.INTEGER(11),
        allowNull: false
    },
};


// This is a function that is showing that where will it be used it will take the sequlize from there

module.exports = (sequelize) => {
    return sequelize.define("order", OrderModel)
};


