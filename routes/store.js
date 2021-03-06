var express = require("express");
var router = express.Router();
const multer = require("multer");
var auth = require("../services/authenticate");
var storeController = require("../controllers/storeController");

const upload = multer();

router.use(auth);

router.use(storeController.validateAccountId);

//.../api/store/create
router.post(
  "/create",
  storeController.validateAndSanitizeStore,
  storeController.createStore
);

//.../api/store/create/goods
router.post(
  "/create/goods",
  upload.single("picture"),
  storeController.validateAndSanitizeGoods,
  storeController.createGoods
);

module.exports = router;
