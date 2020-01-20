"use strict";
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "Users",
    {
      name: DataTypes.STRING,
      pass: DataTypes.STRING
    },
    { timestamps: false }
  );
  Users.associate = function(models) {
    // associations can be defined here
    Users.hasMany(models.posts);
    Users.hasMany(models.Comments);
    Users.hasMany(models.Likes);
  };
  return Users;
};
