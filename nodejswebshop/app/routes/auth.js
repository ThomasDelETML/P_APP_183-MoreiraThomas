const express = require("express");
const router = express.Router();
const controller = require("../controllers/AuthController");

router.get("/login", controller.get);
router.post("/login", controller.checkUser);

router.get("/register", controller.get);
router.post("/register", controller.checkUser);
// router.post("/register", controller.registerUser);
// A mettre quand ça fonctionne

module.exports = router;
