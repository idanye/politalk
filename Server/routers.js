import express from "express";
import * as authController from "./Controllers/authController.js";
import * as adminController from "./Controllers/adminController.js";
import * as userController from "./Controllers/userController.js";
import * as responseController from "./Controllers/responseController.js";

const router = express.Router();

// ADMIN MIDDLEWARE
router.use("/admin", authController.adminAuth, express.static("./Admin"));

//AUTH ROUTES
router.post("/register-user", authController.registerUser);
router.post("/validate-token", authController.validateUserToken);
router.get("/check-approval/:googleId", authController.checkUserApproval);

//USER ROUTES
router.post("/ai-response-published", userController.publishResponse);
router.post("/increment-click", userController.incrementClick);
router.get('/responses/:userId', userController.getUserResponses);

//RESPONSE ROUTES
router.post("/generate-response", responseController.generateResponse);

//ADMIN ROUTES
router.post("/approve-user", adminController.approveUser);
router.post("/set-daily-click-limit", adminController.setDailyClickLimit);
router.get("/users", adminController.getAllUsers);

export default router;