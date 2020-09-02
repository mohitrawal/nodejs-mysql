const express = require('express');
const validation = require('../Common/Validation');
const router = express.Router();
const UserController = require("../Controller/UserController");

router.get("/", UserController.userList);
router.get("/:id", UserController.userDetails);
router.post("/", validation.validate('createUser'), UserController.create);
router.post("/login", validation.validate('login'), UserController.login);
module.exports = router;
