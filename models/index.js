const dbConfig = require('../config/dbConfig');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.password, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
}
)

sequelize.authenticate()
    .then(() => {
        console.log("Database connected successfully");
    })
    .catch(() => {
        console.log("Error connecting to the database");
    })

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.users = require('./userModel')(sequelize, DataTypes)
db.rooms = require('./roomModel')(sequelize, DataTypes);

db.sequelize.sync({ force: false })
.then(() => {
    console.log("Database Re-sync Done");
})

module.exports = db;