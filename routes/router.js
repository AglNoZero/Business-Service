var express = require("express");
var router = express.Router();

var businessRouter = require("./business");

router.use("/business", businessRouter);

module.exports = router;
