var { DataTypes } = require('sequelize');

const UserModel = {
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

    username: {
        type: DataTypes.STRING(255),
        unique: true,
        allowNull: false
    },


    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
    },


    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    },


    profile_pic: {
        type: DataTypes.STRING(255),
        allowNull: true
    },



    // This is for the password rest by the user

    resetPasswordToken: DataTypes.STRING,
    resetPasswordExpires: DataTypes.DATE,

};


// This is a function that is showing that where will it be used it will take the sequlize from there

module.exports = (sequelize) => {
    return sequelize.define("user", UserModel)
};


