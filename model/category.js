module.exports =(sequelize,DataTypes)=>{
    const category = sequelize.define("category", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "分类名称",
      },
      parentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "父级id",
        defaultValue:0
      },
    });
    return category;
}