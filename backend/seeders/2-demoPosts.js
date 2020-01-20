const image = require("../config/testimage.json");
("use strict");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("posts", [
      {
        text: "Text 1",
        image: image.code,
        createdAt: new Date(),
        updatedAt: new Date(),
        UserId: 1
      },
      {
        text: "text2",
        image: image.code,
        createdAt: new Date(),
        updatedAt: new Date(),
        UserId: 1
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("posts", null, {});
  }
};
