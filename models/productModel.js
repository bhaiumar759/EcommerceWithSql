var { DataTypes } = require('sequelize');

const ProductModel = {
    id: {
        type: DataTypes.INTEGER(11),
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    slug: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    description: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER(11),
        allowNull: false
    },
    picture: {
        type: DataTypes.STRING,
        allowNull: true
    },
    stock: {
        type: DataTypes.INTEGER(11),
        allowNull: false
    },
};


// This is a function that is showing that where will it be used it will take the sequlize from there

module.exports = (sequelize) => {
    return sequelize.define("product", ProductModel)
};


