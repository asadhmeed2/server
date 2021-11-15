const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const Router= require("./server.router").router;

app.use('/',Router)

mongoose.connect(
  `mongodb+srv://asadhm:${process.env.mongodbPassword}@cluster0.jdmn4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to DB");
  }
);

app.listen(process.env.PORT ||5000, () => {
  console.log("listening on port 5000");
});
