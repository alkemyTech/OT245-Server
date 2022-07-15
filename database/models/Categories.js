"use strict";

module.exports = (sequelize, DataTypes) => {
  Categories.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { len: [0, 50] },
      },
      description: {
        type: DataTypes.STRING,
        validate: { len: [0, 200] },
      },
      image: {
        type: DataTypes.STRING,
        validate: { len: [0, 300] },
      },
    },
    {
      sequelize,
      modelName: "Categories",
      timestamps: true,
      paranoid: true,
    }
  );
  return Categories;
};
