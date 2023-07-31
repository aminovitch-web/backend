const express = require('express');
const { createMultipleUsers, createUser, loginUser, getAllUsers, getSingleUser, deleteUser, deleteAllUsers, updateUser, blockUser, unblockUser, assignRole, getUsers, handleRefreshToken, logout, updatePassword,forgotPasswordToken, resetPassword } = require("../controllers/userControllers");
const { authMiddleware, isAdmin} = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/signup",createUser);
router.post("/forgot-password-token",forgotPasswordToken);
router.post("/reset-passsword/:token",resetPassword)
router.put("/password", authMiddleware, updatePassword);
router.post('/createmultipleusers/:number', createMultipleUsers);
router.post("/login", loginUser);
router.get("/all-users", getAllUsers);
router.get("/refresh", handleRefreshToken);
router.get("/logout", logout);
router.get("/:id", authMiddleware, isAdmin, getSingleUser);
router.delete("/:id", deleteUser);
router.post("/delete-allusers", deleteAllUsers);
router.put("/edit-user", authMiddleware,updateUser);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser );


 
module.exports = router;