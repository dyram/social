const model = require("../models");
const User = model.Users;

Users = () => {};

Users.editUser = async (id, newName) => {
  let promise = await User.update(
    { name: newName },
    {
      where: { id: id }
    }
  );
  return promise;
};

module.exports = Users;
