const image = require("../config/testimage.json");
("use strict");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("posts", [
      {
        user: "John Doe",
        text: "Text 1",
        image: image.code,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user: "Jane Doe",
        text: "text2",
        image: image.code,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("posts", null, {});
  }
};
