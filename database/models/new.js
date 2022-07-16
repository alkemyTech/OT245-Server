'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class New extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      New.belongsTo(models.Category,{
        foreignKey: 'id',
        targetKey: 'categoryId'
      })
    }
  };
  New.init({
    name: DataTypes.STRING,
    content: DataTypes.TEXT,
    image: DataTypes.STRING,
    categoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'New',
    timestamps: true,
    paranoid: true
  });
  return New;
};