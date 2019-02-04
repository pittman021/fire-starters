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
        type: Sequelize.SMALLINT
      },
      retirement_age: {
        type: Sequelize.SMALLINT
      },
      withdrawal_rate: {
        type: Sequelize.SMALLINT
      },
      retirement_year: {
        type: Sequelize.SMALLINT
      },
      er_progress: {
        type: Sequelize.SMALLINT
      },
      retirement_amount: {
        type: Sequelize.SMALLINT
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
