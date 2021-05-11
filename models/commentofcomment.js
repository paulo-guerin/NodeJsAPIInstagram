'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CommentOfComment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CommentOfComment.belongsTo(models.Comment, {foreignKey:'commentedId'}),
      CommentOfComment.belongsTo(models.Comment, {foreignKey:'commentOfCommentId'})
    }
  };
  CommentOfComment.init({
    commentedId: DataTypes.INTEGER,
    commentOfCommentId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CommentOfComment',
  });
  return CommentOfComment;
};