'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   return queryInterface.createTable('posts_categories', {
    postId: {
    type: Sequelize.INTEGER,
    field: 'post_id',

    references: {
      model: 'users',
      key: 'id'
    },

    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    primaryKey: true,

    },

    categoryId: {
      type: Sequelize.INTEGER,
      field: 'category_id',
  
      references: {
        model: 'categories',
        key: 'id'
      },
  
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      primaryKey: true
    }
   })
  },

  down: async (queryInterface, Sequelize) => {
   return queryInterface.dropTable('post_categories')
  }
};
