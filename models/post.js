'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Post.belongsTo(models.User, {foreignKey: 'userId', as: 'author'}),
      Post.hasMany(models.Comment, {as: 'comments'}),
      Post.belongsToMany(models.User, {through: 'Like', foreignKey: 'postId', as: 'likedByUsers'}),
      Post.belongsToMany(models.Hashtag, {through: 'HashtagPost', foreignKey: 'postId', as: 'hashtags'})
    }
  };
  Post.init({
    img: DataTypes.STRING,
    location: DataTypes.STRING,
    description: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};