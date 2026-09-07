import mongoose from "mongoose";

const examSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    subject: {
      type: String,
      required: true,
    },

    examDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Exam = mongoose.models.Exam || mongoose.model("Exam", examSchema);

export default Exam;