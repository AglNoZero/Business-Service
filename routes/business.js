var express = require("express");
var router = express.Router();
const multer = require("multer");
var auth = require("../services/authenticate");
var businessController = require("../controllers/businessController");

const upload = multer();

router.use(auth);

//router.use(storeController.validateAccountId);

//.../api/business/profile
router.post(
    "/profile/",
    upload.single("logo"),
    upload.array("licenses"),
    businessController.createStoreProfile
);

router.get(
    "/"
);

module.exports = router;