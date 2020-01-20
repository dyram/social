"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn("Comments", "postId", {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: "posts",
            key: "id"
          }
        }),
        queryInterface.addColumn("Comments", "UserId", {
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
        queryInterface.removeColumn("Comments", "postId"),
        queryInterface.removeColumn("Comments", "UserId")
      ]);
    });
  }
};
