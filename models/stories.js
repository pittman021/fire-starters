'use strict';
module.exports = (sequelize, DataTypes) => {
  const Story = sequelize.define(
    'Stories',
    {
      title: DataTypes.STRING,
      slug: DataTypes.STRING,
      img: DataTypes.STRING,
      content: DataTypes.TEXT
    },
    {}
  );
  Story.associate = function(models) {
    Story.belongsTo(models.Contact, {
      foreignKey: 'ContactId',
      onDelete: 'CASCADE'
    });
    // associations can be defined here
  };
  return Story;
};
