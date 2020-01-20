"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Comments", [
      {
        text: "nice pic",
        createdAt: new Date(),
        updatedAt: new Date(),
        postId: 1,
        UserId: 1
      },
      {
        text: "Cool",
        createdAt: new Date(),
        updatedAt: new Date(),
        postId: 1,
        UserId: 1
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Comments", null, {});
  }
};
