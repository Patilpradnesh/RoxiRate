const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const { getAllStores } = require("../controllers/storeController");

router.get("/", auth, getAllStores);

module.exports = router;
