'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

 await queryInterface.bulkInsert('Roles', [
  {
    name: 'Admin',
    description: 'Administator',
    createdAt: new Date(),
    updatedAt: new Date(),
    },
  {
    name: 'Standart',
    description:'Regular User',
    createdAt: new Date(),
    updatedAt: new Date(),

  }], {});

  },

  down: async (queryInterface, Sequelize) => {
  }
};
