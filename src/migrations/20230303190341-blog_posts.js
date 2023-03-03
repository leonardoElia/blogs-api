'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('blog_posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER,
        primaryKey: true
      },

      title: {
        type: Sequelize.STRING
      },

      content: {
        type: Sequelize.STRING
      },

      userId: {
        type: Sequelize.INTEGER,
        allowNull: false, 
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        field: 'user_id',

        references: {
          model: 'users',
          key: 'id'
        }
      },

      published: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      
      updated: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
    })
    
   },
 
   down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('blog_posts')
   }
  
}


  