const express = require('express');
const validation = require('../Common/Validation');
const router = express.Router();
const UserController = require("../Controller/UserController");

router.get("/", UserController.userList);
router.get("/:id", UserController.userDetails);
router.post("/", validation.validate('createUser'), UserController.create);
module.exports = router;
