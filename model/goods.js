module.exports = (sequelize, DataTypes) => {
  const goods = sequelize.define("goods", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "商品名称",
    },
    imgurl: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "商品图片",
      defaultValue: "",
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: "商品内容",
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      comment: "打折价格",
      defaultValue: 0,
    },
    market_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      comment: "打折价格",
      defaultValue: 0,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "商品库存",
    }
  });
  return goods;
};
