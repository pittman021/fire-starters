'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tools = sequelize.define('Tools', {
    img: DataTypes.BLOB,
    title: DataTypes.STRING,
    url: DataTypes.STRING
  }, {});
  Tools.associate = function(models) {
    // associations can be defined here
  };
  return Tools;
};