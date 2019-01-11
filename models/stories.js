'use strict';
module.exports = (sequelize, DataTypes) => {
  const stories = sequelize.define(
    'Stories',
    {
      contact_name: DataTypes.STRING,
      title: DataTypes.STRING,
      slug: DataTypes.STRING,
      img: DataTypes.STRING,
      content: DataTypes.TEXT
    },
    {}
  );
  stories.associate = function(models) {
    // associations can be defined here
  };
  return stories;
};
