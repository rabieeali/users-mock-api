const express = require("express");
const router = express.Router();
const { getUsers,getSingleUser,createNewUser , editUser, deleteUser } = require("../controllers/usersController");


// Main Route => /api/users
// isPrivate => false

router.get("/", getUsers);
router.get("/:id", getSingleUser);
router.post("/", createNewUser);
router.put("/:id", editUser);
router.delete("/:id", deleteUser);

module.exports = router;
