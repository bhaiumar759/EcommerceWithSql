const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post("/login", authController.logIn)
router.post("/logout", authController.logOut)
router.post("/forgetpass", authController.forgetPassword)
// router.get("/roll/:userId/:roleId", orderController.updateRole);


module.exports = router;