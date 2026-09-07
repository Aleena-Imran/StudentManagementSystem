import express from "express";

import {
  getStudentResults,
  getStudentsForResults,
  addResult,
} from "../controllers/resultController.js";

import {
  protect,
  authorize,
} from "../middleware/authMiddleware.js";

const router = express.Router();


// STUDENT
router.get(
  "/",
  protect,
  authorize("student"),
  getStudentResults
);


// TEACHER
router.get(
  "/students",
  protect,
  authorize("teacher"),
  getStudentsForResults
);

router.post(
  "/",
  protect,
  authorize("teacher"),
  addResult
);

export default router;