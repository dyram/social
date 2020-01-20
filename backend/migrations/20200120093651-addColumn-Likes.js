"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn("Likes", "postId", {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: "posts",
            key: "id"
          }
        }),
        queryInterface.addColumn("Likes", "UserId", {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: "Users",
            key: "id"
          }
        })
      ]);
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn("Likes", "postId"),
        queryInterface.removeColumn("Likes", "UserId")
      ]);
    });
  }
};
