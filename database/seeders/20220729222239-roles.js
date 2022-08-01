'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

 await queryInterface.bulkInsert('Roles', [
  {
    name: 'Admin',
    description: 'Administrator',
    createdAt: new Date(),
    updatedAt: new Date(),
    },
  {
    name: 'Standard',
    description:'Regular User',
    createdAt: new Date(),
    updatedAt: new Date(),

  }], {});

  },

  down: async (queryInterface, Sequelize) => {
  }
};
