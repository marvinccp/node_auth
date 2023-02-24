const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

const isAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return next("please loggin to acces");
    }
    const verify = await jwt.verify(token, process.env.SECRET_KEY);
    req.user = await userModel.findById(verify.id);
    next();
  } catch (error) {
    return next(error);
  }
};

module.exports = isAuth;
