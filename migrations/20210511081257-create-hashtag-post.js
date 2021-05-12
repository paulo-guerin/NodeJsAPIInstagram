'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('HashtagPosts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      hashtagId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        allowNull:false,
        references:{
          model: 'Hashtags',
          key:'id'
        }
      },
      postId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        allowNull:false,
        references:{
          model: 'Posts',
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
    await queryInterface.dropTable('HashtagPosts');
  }
};