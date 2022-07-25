'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Activities',[{
      name: "Raise awareness in society about social, humanitarian and environmental causes.",
      image: "https://media.istockphoto.com/id/1327919661/es/foto/concepto-del-d%C3%ADa-mundial-de-la-tierra-energ%C3%ADa-verde-recursos-renovables-y-sostenibles-cuidado.webp?s=612x612&w=is&k=20&c=FGDsXvBF0bqBhgcn3cUGpKADOsnLHcBoKiIwD85lzK8=",
      content: "The ONG we play an essential role in informing and raising awareness in society about problems that affect the global world such as poverty, inequality, injustice, humanitarian crises, population displacement or climate change.",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Promote social transformation projects.",
      image: "https://media.istockphoto.com/photos/confident-female-volunteer-talks-with-friends-picture-id1192366473",
      content: "Although there are many ONG and causes, most of us have a common mission: to protect the poorest and most disadvantaged people.",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: "Strengthen citizens so that they are aware of their rights and can demand them.",
      image: "https://media.istockphoto.com/photos/volunteers-smile-as-they-listen-to-food-drive-organizer-picture-id1357618215",
      content: "All people have civil rights, but also social, economic and cultural rights. The work of ONG is invaluable so that the most vulnerable people can access knowledge of their rights.",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Work with honesty, professionalism, commitment and transparency.",
      image: "https://media.istockphoto.com/photos/community-food-bank-volunteers-working-during-covid19-crisis-picture-id1283072124",
      content: "ONG depend on the trust of society to count on their collaboration, therefore, it is key to carry out an impeccable management of our work.",
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ],{})
  },

  down: async (queryInterface, Sequelize) => {   
    await queryInterface.bulkDelete('Activities', null, {});
    
  }
};
