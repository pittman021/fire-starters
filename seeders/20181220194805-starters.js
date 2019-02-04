'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    var content = `Coming Soon!`;

    var mmm = {
      id: 0,
      name: 'Mr Money Mustache',
      savings_rate: 65,
      retirement_age: 32,
      withdrawal_rate: 4,
      retirement_year: 2009,
      er_progress: 100,
      retirement_amount: 485,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    var erd = {
      id: 1,
      name: 'Early Retirement Dude',
      savings_rate: 58,
      retirement_age: 44,
      withdrawal_rate: 6,
      retirement_year: 2012,
      er_progress: 100,
      retirement_amount: 575,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    var newArray = [];

    newArray.push(mmm);

    console.log(`created ${mmm.name} contact`);

    newArray.push(erd);

    console.log(`created ${erd.name} contact`);

    return queryInterface.bulkInsert('Contacts', newArray, {});
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Contacts', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
