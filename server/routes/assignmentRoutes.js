import express from "express";

import {
  getAssignments,
  createAssignment,
  updateAssignment,
  deleteAssignment,
} from "../controllers/assignmentController.js";

import {
  protect,
  authorize,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// Get assignments
router.get(
  "/",
  protect,
  authorize("admin", "teacher", "student"),
  getAssignments
);

// Create assignment
router.post(
  "/",
  protect,
  authorize("admin", "teacher"),
  createAssignment
);

// Update assignment
router.put(
  "/:id",
  protect,
  authorize("admin", "teacher"),
  updateAssignment
);

// Delete assignment
router.delete(
  "/:id",
  protect,
  authorize("admin", "teacher"),
  deleteAssignment
);

export default router;