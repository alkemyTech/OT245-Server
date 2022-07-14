'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Member extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Member.init({
    name: DataTypes.STRING, allowNull: false,
    facebookUrl: DataTypes.STRING, allowNull: true,
    instagramUrl: DataTypes.STRING, allowNull: true,
    linkedinUrl: DataTypes.STRING, allowNull: true,
    image: DataTypes.STRING, allowNull: false,
    description: DataTypes.STRING ,allowNull: true,
  }, {
    sequelize,
    modelName: 'Member',
    paranoid: true,
    timestamps: true,
  });
  return Member;
};