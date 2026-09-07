import express from "express";
import {
  getExams,
  createExam,
  updateExam,
  deleteExam,
} from "../controllers/examController.js";
import {
  protect,
  authorize,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
  "/",
  protect,
  authorize("admin", "teacher", "student"),
  getExams
);

router.post(
  "/",
  protect,
  authorize("admin", "teacher"),
  createExam
);

router.put(
  "/:id",
  protect,
  authorize("admin", "teacher"),
  updateExam
);

router.delete(
  "/:id",
  protect,
  authorize("admin", "teacher"),
  deleteExam
);

export default router;