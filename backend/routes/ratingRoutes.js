const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const { submitOrUpdateRating } = require("../controllers/ratingController");


router.post("/:storeId", auth, submitOrUpdateRating);

module.exports = router;
