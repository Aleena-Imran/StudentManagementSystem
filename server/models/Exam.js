import mongoose from "mongoose";

const examSchema = new mongoose.Schema(
  {
    title: String,

    examDate: {
      type: Date,
      required: true,
    },

    subject: String,
  },
  { timestamps: true }
);

export default mongoose.model("Exam", examSchema);