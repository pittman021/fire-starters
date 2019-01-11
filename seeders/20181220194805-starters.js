'use strict';

var slug = require('slug');

module.exports = {
  up: (queryInterface, Sequelize) => {
    var content = `Coming Soon!`;

    var s = {
      id: 0,
      contact_name: 'Mr Money Mustache',
      title: 'How a 36 year old acheived FIRE through badass living & attitude',
      slug: slug('How a 36 year old acheived FIRE through badass living & attitude'),
      img: 'mr-money-mustache.jpeg',
      content: content,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    var erd = {
      id: 1,
      contact_name: 'Early Retirement Dude',
      title: 'How the 10 commandments of early retirement helped Early Retirement Dude acheive his goals',
      slug: slug('The 10 commandments of early retirement dude'),
      img: 'early-retirement-dude.png',
      content: content,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    var newArray = [];

    newArray.push(s);

    console.log(`created ${s.contact_name} story`);

    newArray.push(erd);

    console.log(`created ${erd.contact_name} story`);

    return queryInterface.bulkInsert('Stories', newArray, {});
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
    return queryInterface.bulkDelete('Stories', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
