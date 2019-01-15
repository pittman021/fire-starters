'use strict';

const bCrypt = require('bcrypt-nodejs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    var generateHash = function(password) {
      return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
    };

    const userPassword = generateHash('pass');
    var arr = [];
    var admin = {
      id: 0,
      username: 'tim',
      password: userPassword,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    arr.push(admin);

    return queryInterface.bulkInsert('AdminUsers', arr, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('AdminUsers', null, {});
  }
};
