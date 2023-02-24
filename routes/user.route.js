const express = require("express");
const bcrypt = require("bcryptjs");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const isAuth = require("../middleware/auth");

//services
const UserServices = require("../services/user.service");
//services instance
const service = new UserServices();

//creating express router
const route = express.Router();

//importing model
const userModel = require("../models/user.model");

//register route
route.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //check, emptyness data ?
    if (!name || !email || !password) {
      return res.json({
        message: "Need all data",
      });
    }

    // check, user exist?
    const userExist = await userModel.findOne({ email: req.body.email });
    if (userExist) {
      return res.json({
        message: "user exist with the given emailId",
      });
    }

    //hash the password
    const salt = await bcrypt.genSalt(saltRounds);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashPassword;

    const user = new userModel(req.body);
    await user.save();

    const token =  jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRE,
    });
    return res
      .cookie( 'token', token )
      .json({ succes: true, message: "Register ok", data: user });
  } catch (error) {
    return res.json({ error: error });
  }
});

//login route
route.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    //check, emptyness data ?

    if (!email || !password) {
      return res.json({
        message: "Need all data",
      });
    }

    // check, user exist?
    const userExist = await userModel.findOne({ email: req.body.email });
    console.log(userExist);
    if (!userExist) {
      return res.json({
        message: "Wrong credentials",
      });
    }

    //Check password match
    const isPasswordMatched = await bcrypt.compare(
      password,
      userExist.password
    );
    if (!isPasswordMatched) {
      return res.json({
        message: "Wrong credentials",
      });
    }

    const token = jwt.sign({ id: userExist._id }, process.env.SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRE,
    });

    return res
      .cookie("token", token)
      .json({ success: true, message: "LoggedIn Successfully" });
  } catch (error) {
    return res.json({ error: error });
  }
});

//get users
route.get("/users", isAuth, async (req, res) => {
  try {
    const users = await userModel.find();
    if (!user) {
      return res.json({ message: "Not Found" });
    }
    return res.json({ users: users });
  } catch (error) {
    return res.json({ error: error });
  }
});


//get user
route.get("/user/:_id", isAuth, async (req, res) => {
  try {
    const { _id } = req.params;
    const user = await service.getOne(_id);
    console.log(user)
    if (!user) {
      return res.json({ message: "Not Found" });
    }
    return res.json({ user: user });
  } catch (error) {
    return res.json({ error: error });
  }
});

module.exports = route;
