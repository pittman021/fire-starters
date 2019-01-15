'use strict';
module.exports = (sequelize, DataTypes) => {
  const AdminUsers = sequelize.define(
    'AdminUsers',
    {
      username: DataTypes.STRING,
      password: DataTypes.STRING
    },
    {}
  );
  AdminUsers.associate = function(models) {
    // associations can be defined here
  };
  return AdminUsers;
};
