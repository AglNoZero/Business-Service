var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var Router = require("./routes/router");

var app = express();

var mongoURL =
  "mongodb+srv://admin:admin@businessservice.6zuzs.mongodb.net/test";
  
const options = {
  dbName: "store",
};
mongoose.connect(mongoURL, options);
var db = mongoose.connection;

db.on("connected", () => console.log("MongoDB connected successfully"));
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", Router);

module.exports = app;
