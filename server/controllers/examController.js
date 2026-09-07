import Exam from "../models/Exam.js";

// GET ALL EXAMS
export const getExams = async (req, res) => {
  try {
    const exams = await Exam.find().sort({ examDate: 1 });

    res.status(200).json({ exams });
  } catch (error) {
    console.error("Get exams error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// CREATE EXAM
export const createExam = async (req, res) => {
  try {
    const { title, subject, examDate } = req.body;

    if (!title || !subject || !examDate) {
      return res.status(400).json({
        message: "Title, subject and exam date are required",
      });
    }

    const exam = await Exam.create({
      title,
      subject,
      examDate,
    });

    res.status(201).json({
      message: "Exam created successfully",
      exam,
    });
  } catch (error) {
    console.error("Create exam error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// UPDATE EXAM
export const updateExam = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, subject, examDate } = req.body;

    if (!title || !subject || !examDate) {
      return res.status(400).json({
        message: "Title, subject and exam date are required",
      });
    }

    const exam = await Exam.findById(id);

    if (!exam) {
      return res.status(404).json({
        message: "Exam not found",
      });
    }

    exam.title = title;
    exam.subject = subject;
    exam.examDate = examDate;

    await exam.save();

    res.status(200).json({
      message: "Exam updated successfully",
      exam,
    });
  } catch (error) {
    console.error("Update exam error:", error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// DELETE EXAM
export const deleteExam = async (req, res) => {
  try {
    const { id } = req.params;

    const exam = await Exam.findById(id);

    if (!exam) {
      return res.status(404).json({
        message: "Exam not found",
      });
    }

    await Exam.findByIdAndDelete(id);

    res.status(200).json({
      message: "Exam deleted successfully",
    });
  } catch (error) {
    console.error("Delete exam error:", error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};