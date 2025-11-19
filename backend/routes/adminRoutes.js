const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const permit = require("../middlewares/role");
const {addStore,getDashboardStats,getAllUsers,getAllStores,getUserDetails,addUser} = require("../controllers/adminController");
const { adminUserValidation, handleValidation } = require("../middlewares/validators");

router.get("/users", auth, permit("admin"), getAllUsers);
router.post("/store", auth, permit("admin"), addStore);
router.get("/dashboard", auth, permit("admin"), getDashboardStats);
router.get("/stores", auth, permit("admin"), getAllStores);
router.get("/users/:id", auth, permit("admin"), getUserDetails);
router.post("/user",auth,permit("admin"),adminUserValidation, handleValidation,addUser);

module.exports = router;
