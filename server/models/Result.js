import mongoose from "mongoose";

const resultSchema = new mongoose.Schema(
    {
        studentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student",
            required: true,
        },
        subject: {
            type: String,
            required: true,
            trim: true,
        },
        assessment: {
            type: String,
            required: true,
            trim: true,
        },
        marksObtained: {
            type: Number,
            required: true,
            min: 0,
        },
        maxMarks: {
            type: Number,
            required: true,
            min: 1,
        },
        grade: {
            type: String,
            required: true,
            trim: true,
        },
        semester: {
            type: String,
            required: true,
            trim: true,
        },
        examDate: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

const Result =
    mongoose.models.Result || mongoose.model("Result", resultSchema);
export default Result;