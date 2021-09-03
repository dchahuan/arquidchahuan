module.exports = {
  up: async (queryInterface) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    const arr = [
      {
        name: 'Bitcoin',
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        name: 'Etherium',
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        name: 'Cardano',
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        name: 'XRP',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert('Products', arr);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Products', null, {});
  },
};
