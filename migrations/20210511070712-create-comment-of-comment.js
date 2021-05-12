'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('CommentOfComments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      commentedId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        allowNull:false,
        references:{
          model: 'Comments',
          key:'id'
        }
      },
      commentOfCommentId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        allowNull:false,
        references:{
          model: 'Comments',
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
    await queryInterface.dropTable('CommentOfComments');
  }
};