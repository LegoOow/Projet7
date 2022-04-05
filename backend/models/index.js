require('dotenv').config();
const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.js")(sequelize, Sequelize);
db.post = require("./post.js")(sequelize, Sequelize);
db.comment = require("./comment.js")(sequelize, Sequelize);

db.comment.hasMany(db.user, {
  foreignKey : 'userId',
  targetKey: 'id'
});

db.comment.hasMany(db.post, {
  foreignKey : 'postId',
  targetKey: 'id'
});

db.post.hasMany(db.user, {
  foreignKey : 'userId',
  sourceKey: 'id'
});

module.exports = db;