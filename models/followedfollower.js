'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FollowedFollower extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      FollowedFollower.belongsTo(models.User, {foreignKey:'followerId'}),
      FollowedFollower.belongsTo(models.User, {foreignKey:'followedId'})
    }
  };
  FollowedFollower.init({
    followedId: DataTypes.INTEGER,
    followerId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'FollowedFollower',
  });
  return FollowedFollower;
};