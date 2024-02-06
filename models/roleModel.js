var { DataTypes } = require('sequelize');

const RoleModel = {
    id: {
        type: DataTypes.INTEGER(11),
        autoIncrement: true,
        primaryKey: true
    },

    name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },

    description: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
};


// This is a function that is showing that where will it be used it will take the sequlize from there

module.exports = (sequelize) => {
    return sequelize.define("role", RoleModel)
};


