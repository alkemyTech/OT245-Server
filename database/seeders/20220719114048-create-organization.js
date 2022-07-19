'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Organizations', [{
      name: 'Organization1',
      image: 'https://organization1.com/image.jpg',
      address: 'address 123',
      phone: 123124556,
      email: 'org@mail.com',
      welcomeText: 'welcome!',
      aboutUsText: 'about text',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
