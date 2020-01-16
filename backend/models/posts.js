"use strict";
module.exports = (sequelize, DataTypes) => {
  const posts = sequelize.define(
    "posts",
    {
      user: DataTypes.STRING,
      text: DataTypes.STRING,
      image: DataTypes.TEXT
    },
    {}
  );
  posts.associate = function(models) {
    // associations can be defined here
  };
  return posts;
};
