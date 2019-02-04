'use strict';

var slug = require('slug');

module.exports = {
  up: (queryInterface, Sequelize) => {
    var content = `Coming Soon!`;

    var mmm_story = {
      id: 0,
      ContactId: 0,
      title: 'How a 36 year old acheived FIRE through badass living & attitude',
      slug: slug('How a 6 year old acheived FIRE through badass living & attitude'),
      img: 'mr-money-mustache.jpeg',
      content: content,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    var erd_story = {
      id: 1,
      ContactId: 1,
      title: 'How the ERD Dude Lives His Life of Retirement',
      slug: slug('How the ERD Dude Lives His Life of Retirement'),
      img: 'mr-money-mustache.jpeg',
      content: content,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    var newArray = [];

    newArray.push(mmm_story);

    console.log(`created ${mmm_story.title} story`);

    newArray.push(erd_story);

    console.log(`created ${mmm_story.title} story`);

    return queryInterface.bulkInsert('Stories', newArray, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Stories', null, {});
  }
};
