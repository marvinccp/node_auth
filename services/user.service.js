const userModel = require("../models/user.model");
class UserService {

  async getOne(_id) {
    const user = await userModel.findById(_id);
    return user;
  }
}

module.exports = UserService