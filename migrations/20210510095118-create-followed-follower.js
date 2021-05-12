'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('FollowedFollowers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      followedId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        allowNull:false,
        references:{
          model: 'Users',
          key:'id'
        }
      },
      followerId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        allowNull:false,
        references:{
          model: 'Users',
          key:'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('FollowedFollowers');
  }
};