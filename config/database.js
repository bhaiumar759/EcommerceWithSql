// This is the file for the database
var Sequelize = require('sequelize');
var userModel = require('../models/userModel');
var productModel = require('../models/productModel');
var orderModel = require('../models/orderModel');
var addressModel = require('../models/addressModel');
var roleModel = require('../models/roleModel');


const sequelize = new Sequelize("ecommerace1", "root", "", {
    host: "localhost",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
});


// This is the model

const User = userModel(sequelize, Sequelize);
const Product = productModel(sequelize, Sequelize);
const Order = orderModel(sequelize, Sequelize);
const Address = addressModel(sequelize, Sequelize);
const Role = roleModel(sequelize, Sequelize);


// Here we will discuss the relations
// =====================
// Relations


Address.belongsTo(User);
Order.belongsTo(User);
Order.belongsTo(Address);
Role.belongsToMany(User, { through: 'user_role' });
User.belongsToMany(Role, { through: 'user_role' });



// Check Database Connection

async function checkDatabaseConnection() {
    try {
        await sequelize.authenticate();
        console.log('Connection to database established successfully!');
    } catch (error) {
        console.error('Unable to connect to the database. Please start XAMPP!');
        // console.error('Unable to connect to the database:', error);
    }
}

checkDatabaseConnection();



// =====================
// Sync Tables

async function syncDatabaseTables() {
    await sequelize.sync({ alter: true }).then(() => {
        console.log(`Tables synced!`);
    });
}

// syncDatabaseTables(); //! Uncomment to sync tables


module.exports = {
    User,
    Product,
    Order,
    Address,
    Role
}