import { Router } from "express";
import * as userService from "./user.service.js";
const router = Router();

// get user by id
router.get("/:id", userService.getUserById);
// signup user
router.post("/signup",userService.signup);
// login user
router.post("/login",userService.login);
// get specific user profile with age (delivered attribute age)
router.get("/profile/:id", userService.getSpecificUser);
// update user
router.patch("/update/:id", userService.updateUser);
// delete user
router.delete("/delete/:id", userService.deleteUser);
// search user
router.get("/search", userService.searchUser);

export default router;