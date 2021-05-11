'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HashtagPost extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      HashtagPost.belongsTo(models.Hashtag, {foreignKey:'hashtagId'}),
      HashtagPost.belongsTo(models.Post, {foreignKey:'postId'})
    }
  };
  HashtagPost.init({
    hashtagId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'HashtagPost',
  });
  return HashtagPost;
};