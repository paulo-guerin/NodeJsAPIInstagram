'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Post, {as: 'posts'}),
      User.hasMany(models.Comment, {as: 'comments'}),
      User.belongsToMany(models.Post, {through: 'Like', foreignKey: 'userId', as: 'likedPosts'}),
      User.belongsToMany(models.User, {through: 'FollowedFollower', foreignKey: 'followedId', as: 'followers'}),
      User.belongsToMany(models.User, {through: 'FollowedFollower', foreignKey: 'followerId', as: 'followedUsers'})
    }
  };
  User.init({
    email:{
      type: DataTypes.STRING,
      unique: true,
      isEmail: true
    },
    birthdate: DataTypes.DATE,
    password: DataTypes.STRING,
    login:{
      type: DataTypes.STRING,
      unique: true
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};