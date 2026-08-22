import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: String,
    course: String,
    grade: String,
  },
  { timestamps: true }
);

export default mongoose.model("Student", studentSchema);