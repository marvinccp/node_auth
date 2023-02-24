const express = require("express");
const dotenv = require("dotenv");

// dotenv path
dotenv.config({ path: "./config/config.env" });
require("./config/conn");

//creating app server
const app = express();
const route = require("./routes/user.route");
const cookieParser = require("cookie-parser");

//express.json request json data
app.use(express.json());
//config cookie parser
app.use(cookieParser());

//using routes
app.use("/api", route);

//listening server
app.listen(process.env.PORT, () => {
  console.log(` server listening in ${process.env.PORT} port`);
});