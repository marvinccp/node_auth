const mongoose = require("mongoose");
console.log(process.env.URI)
mongoose
  .connect(process.env.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then((data) => {
    console.log(` Databse connected to ${data.connection.host}`);
  });

