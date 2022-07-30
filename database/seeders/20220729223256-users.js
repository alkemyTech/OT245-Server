'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
 await queryInterface.bulkInsert('People', [
  {
    firstName: 'Pinto',
    lastName:'unblo',
    email:'punblo@gmail.com',
    password:'$2b$10$5j0cnfOra3nfVdHU7aN8L.wsXKbC2qRhzsJdc8pm4zV6IkTGb7I1y',
    photo:'https://media.istockphoto.com/vectors/and-metaverse-concepts-man-wearing-vr-glasses-and-touching-the-screen-vector-id1360137248',
    roleId:1,
  },
  {
    firstName: 'piter',
    lastName:'Anguila',
    email:'piter@gmail.com',
    password:'$2b$10$5j0cnfOra3nfVdHU7aN8L.wsXKbC2qRhzsJdc8pm4zV6IkTGb7I1y',
    photo:'https://media.istockphoto.com/id/1133929113/es/vector/el-gr%C3%A1fico-de-negocios-de-an%C3%A1lisis-de-empresarios-y-seo-en-web.webp?s=612x612&w=is&k=20&c=wxzeo0RU88oIHMC7Y8Eou5rOLmDPLrrslwPLChbATKo=',
    roleId:2,
  },
  {
    firstName: 'Erica',
    lastName:'Monsk',
    email:'erica@gmail.com',
    password:'$2b$10$5j0cnfOra3nfVdHU7aN8L.wsXKbC2qRhzsJdc8pm4zV6IkTGb7I1y',
    photo:'https://media.istockphoto.com/vectors/and-metaverse-concepts-man-wearing-vr-glasses-and-touching-the-screen-vector-id1360137248',
    roleId:1,
  },
  {
    firstName: 'Sandra',
    lastName:'Borrego',
    email:'sb@gmail.com',
    password: '$2b$10$5j0cnfOra3nfVdHU7aN8L.wsXKbC2qRhzsJdc8pm4zV6IkTGb7I1y',
    photo:'https://media.istockphoto.com/id/1133929113/es/vector/el-gr%C3%A1fico-de-negocios-de-an%C3%A1lisis-de-empresarios-y-seo-en-web.webp?s=612x612&w=is&k=20&c=wxzeo0RU88oIHMC7Y8Eou5rOLmDPLrrslwPLChbATKo=',
    roleId:2,
  },
  {
    firstName: 'Jack ',
    lastName:'Sparrow',
    email:'Jsp@gmail.com',
    password:'$2b$10$5j0cnfOra3nfVdHU7aN8L.wsXKbC2qRhzsJdc8pm4zV6IkTGb7I1y',
    photo:'https://media.istockphoto.com/vectors/and-metaverse-concepts-man-wearing-vr-glasses-and-touching-the-screen-vector-id1360137248',
    roleId:1,
  },
  {
    firstName: 'Finn',
    lastName:'Walker',
    email:'fwalkerb@gmail.com',
    password: '$2b$10$5j0cnfOra3nfVdHU7aN8L.wsXKbC2qRhzsJdc8pm4zV6IkTGb7I1y',
    photo:'https://media.istockphoto.com/id/1133929113/es/vector/el-gr%C3%A1fico-de-negocios-de-an%C3%A1lisis-de-empresarios-y-seo-en-web.webp?s=612x612&w=is&k=20&c=wxzeo0RU88oIHMC7Y8Eou5rOLmDPLrrslwPLChbATKo=',
    roleId:2,
  },
  {
    firstName: 'Han',
    lastName:'Solo',
    email:'hans@gmail.com',
    password:'$2b$10$5j0cnfOra3nfVdHU7aN8L.wsXKbC2qRhzsJdc8pm4zV6IkTGb7I1y',
    photo:'https://media.istockphoto.com/vectors/and-metaverse-concepts-man-wearing-vr-glasses-and-touching-the-screen-vector-id1360137248',
    roleId:1,
  },
  {
    firstName: 'Padmé',
    lastName:'Amidala',
    email:'padmedala@gmail.com',
    password: '$2b$10$5j0cnfOra3nfVdHU7aN8L.wsXKbC2qRhzsJdc8pm4zV6IkTGb7I1y',
    photo:'https://media.istockphoto.com/id/1133929113/es/vector/el-gr%C3%A1fico-de-negocios-de-an%C3%A1lisis-de-empresarios-y-seo-en-web.webp?s=612x612&w=is&k=20&c=wxzeo0RU88oIHMC7Y8Eou5rOLmDPLrrslwPLChbATKo=',
    roleId:2,
  },
  {
    firstName: 'Quira',
    lastName:'Vos',
    email:'qvos@gmail.com',
    password:'$2b$10$5j0cnfOra3nfVdHU7aN8L.wsXKbC2qRhzsJdc8pm4zV6IkTGb7I1y',
    photo:'https://media.istockphoto.com/vectors/and-metaverse-concepts-man-wearing-vr-glasses-and-touching-the-screen-vector-id1360137248',
    roleId:1,
  },
  {
    firstName: 'Assaj',
    lastName:'Ventress',
    email:'assajven@gmail.com',
    password: '$2b$10$5j0cnfOra3nfVdHU7aN8L.wsXKbC2qRhzsJdc8pm4zV6IkTGb7I1y',
    photo:'https://media.istockphoto.com/id/1133929113/es/vector/el-gr%C3%A1fico-de-negocios-de-an%C3%A1lisis-de-empresarios-y-seo-en-web.webp?s=612x612&w=is&k=20&c=wxzeo0RU88oIHMC7Y8Eou5rOLmDPLrrslwPLChbATKo=',
    roleId:2,
  },
  {
    firstName: 'Kylo',
    lastName:'Ren',
    email:'ren@gmail.com',
    password:'$2b$10$5j0cnfOra3nfVdHU7aN8L.wsXKbC2qRhzsJdc8pm4zV6IkTGb7I1y',
    photo:'https://media.istockphoto.com/vectors/and-metaverse-concepts-man-wearing-vr-glasses-and-touching-the-screen-vector-id1360137248',
    roleId:1,
  },
  {
    firstName: 'Lando',
    lastName:'Palpatine',
    email:'lando@gmail.com',
    password: '$2b$10$5j0cnfOra3nfVdHU7aN8L.wsXKbC2qRhzsJdc8pm4zV6IkTGb7I1y',
    photo:'https://media.istockphoto.com/id/1133929113/es/vector/el-gr%C3%A1fico-de-negocios-de-an%C3%A1lisis-de-empresarios-y-seo-en-web.webp?s=612x612&w=is&k=20&c=wxzeo0RU88oIHMC7Y8Eou5rOLmDPLrrslwPLChbATKo=',
    roleId:2,
  },
  {
    firstName: 'Jabba',
    lastName:'Hutt',
    email:'hutt@gmail.com',
    password:'$2b$10$5j0cnfOra3nfVdHU7aN8L.wsXKbC2qRhzsJdc8pm4zV6IkTGb7I1y',
    photo:'https://media.istockphoto.com/vectors/and-metaverse-concepts-man-wearing-vr-glasses-and-touching-the-screen-vector-id1360137248',
    roleId:1,
  },
  {
    firstName: 'Jyn',
    lastName:'Erso',
    email:'jynso@gmail.com',
    password:'$2b$10$5j0cnfOra3nfVdHU7aN8L.wsXKbC2qRhzsJdc8pm4zV6IkTGb7I1y',
    photo:'https://media.istockphoto.com/id/1133929113/es/vector/el-gr%C3%A1fico-de-negocios-de-an%C3%A1lisis-de-empresarios-y-seo-en-web.webp?s=612x612&w=is&k=20&c=wxzeo0RU88oIHMC7Y8Eou5rOLmDPLrrslwPLChbATKo=',
    roleId:2,
  },
  {
    firstName: 'Ahsoka',
    lastName:'Tano',
    email:'atano@gmail.com',
    password:'$2b$10$5j0cnfOra3nfVdHU7aN8L.wsXKbC2qRhzsJdc8pm4zV6IkTGb7I1y',
    photo:'https://media.istockphoto.com/vectors/and-metaverse-concepts-man-wearing-vr-glasses-and-touching-the-screen-vector-id1360137248',
    roleId:1,
  },
  {
    firstName: 'Jinn',
    lastName:'Quigon',
    email:'jqui@gmail.com',
    password: '$2b$10$5j0cnfOra3nfVdHU7aN8L.wsXKbC2qRhzsJdc8pm4zV6IkTGb7I1y',
    photo:'https://media.istockphoto.com/id/1133929113/es/vector/el-gr%C3%A1fico-de-negocios-de-an%C3%A1lisis-de-empresarios-y-seo-en-web.webp?s=612x612&w=is&k=20&c=wxzeo0RU88oIHMC7Y8Eou5rOLmDPLrrslwPLChbATKo=',
    roleId:2,
  },
  {
    firstName: 'Mace',
    lastName:'Windu',
    email:'macewin@gmail.com',
    password:'$2b$10$5j0cnfOra3nfVdHU7aN8L.wsXKbC2qRhzsJdc8pm4zV6IkTGb7I1y',
    photo:'https://media.istockphoto.com/vectors/and-metaverse-concepts-man-wearing-vr-glasses-and-touching-the-screen-vector-id1360137248',
    roleId:1,
  },
  {
    firstName: 'Cara',
    lastName:'Dune',
    email:'caradune@gmail.com',
    password: '$2b$10$5j0cnfOra3nfVdHU7aN8L.wsXKbC2qRhzsJdc8pm4zV6IkTGb7I1y',
    photo:'https://media.istockphoto.com/id/1133929113/es/vector/el-gr%C3%A1fico-de-negocios-de-an%C3%A1lisis-de-empresarios-y-seo-en-web.webp?s=612x612&w=is&k=20&c=wxzeo0RU88oIHMC7Y8Eou5rOLmDPLrrslwPLChbATKo=',
    roleId:2,
  },
  {
    firstName: 'Boba',
    lastName:'Fett',
    email:'fett@gmail.com',
    password:'$2b$10$5j0cnfOra3nfVdHU7aN8L.wsXKbC2qRhzsJdc8pm4zV6IkTGb7I1y',
    photo:'https://media.istockphoto.com/vectors/and-metaverse-concepts-man-wearing-vr-glasses-and-touching-the-screen-vector-id1360137248',
    roleId:1,
  },
  {
    firstName: 'Baby',
    lastName:'Yoda',
    email:'badyoda@gmail.com',
    password: '$2b$10$5j0cnfOra3nfVdHU7aN8L.wsXKbC2qRhzsJdc8pm4zV6IkTGb7I1y',
    photo:'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/baby-yoda-mejor-personaje-star-wars-1626177290.jpg?crop=1xw:1xh;center,top&resize=980:*',
    roleId:2,
  }], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
