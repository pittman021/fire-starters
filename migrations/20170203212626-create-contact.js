'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Contacts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      savings_rate: {
        type: Sequelize.TEXT
      },
      retirement_age: {
        type: Sequelize.TEXT
      },
      withdrawal_rate: {
        type: Sequelize.TEXT
      },
      retirement_year: {
        type: Sequelize.TEXT
      },
      er_progress: {
        type: Sequelize.TEXT
      },
      retirement_amount: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Contacts');
  }
};
