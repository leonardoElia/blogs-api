'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
     id: {
      allowNull: false,
      autoIncrement: true,
      type: Sequelize.INTEGER,
      primaryKey: true
     },

     displayName: {
      type: Sequelize.STRING,
      field: 'display_name',
     },

     email: {
      type: Sequelize.STRING,
     },

     password: {
      type: Sequelize.STRING,
     },

     image: {
      type: Sequelize.STRING,
     }
    })
  },

  down: async (queryInterface, Sequelize) => {
   return queryInterface.dropTable('users')
  }
};
