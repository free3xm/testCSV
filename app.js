const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("config");
const upload = require("express-fileupload");

const app = express();
app.use(upload());
app.use(cors());
app.use("/api", require("./router"));
const port = config.get("port");
const mongoUri = config.get("mongoUri");

async function start() {
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    app.listen(port, err => {
      if (err) return console.log(err);
      console.log(`Server started on port ${port} `);
    });
  } catch (err) {
    console.log(err);
  }
}
start();
