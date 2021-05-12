'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Hashtag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Hashtag.belongsToMany(models.Post, {through: 'HashtagPost', foreignKey: 'hashtagId', as: 'posts'})
    }
  };
  Hashtag.init({
    name:{
      type: DataTypes.STRING,
      unique: true
    }
  }, {
    sequelize,
    modelName: 'Hashtag',
  });
  return Hashtag;
};