'use strict';
module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define(
    'Contact',
    {
      name: DataTypes.STRING,
      savings_rate: DataTypes.SMALLINT,
      retirement_age: DataTypes.SMALLINT,
      withdrawal_rate: DataTypes.SMALLINT,
      retirement_year: DataTypes.SMALLINT,
      er_progress: DataTypes.SMALLINT,
      retirement_amount: DataTypes.SMALLINT
    },
    {}
  );
  Contact.associate = function(models) {
    Contact.hasMany(models.Stories, {
      foreignKey: 'ContactId',
      onDelete: 'CASCADE'
    });

    // associations can be defined here
  };
  return Contact;
};
