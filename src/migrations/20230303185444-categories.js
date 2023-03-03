'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   return queryInterface.createTable('categories', {
    id: {
      allowNull: false,
      autoIncrement: true,
      type: Sequelize.INTEGER,
      primaryKey: true
    },

    name: {
      type: Sequelize.STRING,
    }
   })
   
  },

  down: async (queryInterface, Sequelize) => {
   return queryInterface.dropTable('categories')
  }
};
