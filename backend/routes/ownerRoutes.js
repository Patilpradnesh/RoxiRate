const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const permit = require("../middlewares/role");
const { getOwnerRatings, getOwnerDashboard } = require("../controllers/ownerController");

router.get("/ratings", auth, permit("owner"), getOwnerRatings);
router.get("/dashboard", auth, permit("owner"), getOwnerDashboard);

module.exports = router;
