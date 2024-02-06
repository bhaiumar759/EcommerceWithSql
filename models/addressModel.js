var { DataTypes } = require('sequelize');

const AddressModel = {

    id: {
        type: DataTypes.INTEGER(11),
        autoIncrement: true,
        primaryKey: true
    },


    first_name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },


    last_name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },


    address: {
        type: DataTypes.STRING(255),
        allowNull: false
    },


    city: {
        type: DataTypes.STRING(255),
        allowNull: false
    },

    country: {
        type: DataTypes.STRING(255),
        allowNull: false
    },

    zip_code: {
        type: DataTypes.STRING(255),
        allowNull: false
    },

};


// This is a function that is showing that where will it be used it will take the sequlize from there

module.exports = (sequelize) => {
    return sequelize.define("address", AddressModel)
};


