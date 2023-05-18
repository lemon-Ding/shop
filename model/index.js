// npm i mysql2  npm i sequelize
const config = require('../config/db');
const { Sequelize, DataTypes } = require("sequelize");
// 连接 sequelize + mysql数据库
const sequelize = new Sequelize(config.database, config.username, config.password,config.options);
const category = require('./category')(sequelize,DataTypes);
const goods = require("./goods")(sequelize, DataTypes);

/*
A.belongsTo(B); // A 属于 B
A.hasMany(B); // A 有多个 B

category 表（一）  goods表（多） : id---> categoryId  :  一个商品属于一个分类， 一个分类有多个商品
*/
goods.belongsTo(category);
category.hasMany(goods);

// 同步模型到数据中，创建表
sequelize.sync();
exports.category = category;
exports.goods = goods;