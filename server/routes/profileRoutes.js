import express from "express";
import {
  getMyProfile,
  updateMyProfile,
} from "../controllers/profileController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
  "/me",
  protect,
  authorize("student"),
  getMyProfile
);

router.put(
  "/me",
  protect,
  authorize("student"),
  updateMyProfile
);

export default router;