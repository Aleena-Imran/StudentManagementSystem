import { useEffect, useState } from "react";
import axios from "axios";
import {
  BookOpen,
  CalendarDays,
  Clock,
} from "lucide-react";
import "./Exams.css";

function Exams() {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "http://localhost:5000/api/exams",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setExams(response.data.exams || []);
      } catch (err) {
        console.error("Exam error:", err);
        setError("Unable to load exams");
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, []);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getDaysRemaining = (date) => {
    const today = new Date();
    const examDate = new Date(date);

    today.setHours(0, 0, 0, 0);
    examDate.setHours(0, 0, 0, 0);

    const difference = examDate - today;
    return Math.ceil(difference / (1000 * 60 * 60 * 24));
  };

  if (loading) {
    return (
      <div className="exams-page">
        <p className="exams-loading">Loading exams...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="exams-page">
        <p className="exams-error">{error}</p>
      </div>
    );
  }

  return (
    <div className="exams-page">

      {/* Header */}
      <div className="exams-header">
        <div>
          <h1>Exams</h1>
          <p>
            View your upcoming examinations and important dates.
          </p>
        </div>
      </div>

      {/* Exam Summary */}
      <div className="exam-summary">
        <div className="exam-summary-card">
          <div className="exam-summary-icon">
            <BookOpen size={22} />
          </div>

          <div>
            <span>Total Exams</span>
            <h2>{exams.length}</h2>
          </div>
        </div>

        <div className="exam-summary-card">
          <div className="exam-summary-icon">
            <CalendarDays size={22} />
          </div>

          <div>
            <span>Upcoming Exams</span>
            <h2>
              {
                exams.filter(
                  (exam) => getDaysRemaining(exam.examDate) >= 0
                ).length
              }
            </h2>
          </div>
        </div>
      </div>

      {/* Exams */}
      <div className="exams-section">

        <div className="exams-section-header">
          <div>
            <h2>Upcoming Examinations</h2>
            <p>Stay prepared for your upcoming exams.</p>
          </div>
        </div>

        {exams.length === 0 ? (
          <div className="no-exams">
            <BookOpen size={40} />
            <h3>No exams scheduled</h3>
            <p>There are currently no examinations available.</p>
          </div>
        ) : (
          <div className="exam-list">

            {exams.map((exam) => {
              const daysRemaining = getDaysRemaining(
                exam.examDate
              );

              const isCompleted = daysRemaining < 0;

              return (
                <div className="exam-item" key={exam._id}>

                  <div className="exam-icon">
                    <BookOpen size={23} />
                  </div>

                  <div className="exam-info">
                    <h3>{exam.title}</h3>

                    <span className="exam-subject">
                      {exam.subject}
                    </span>

                    <div className="exam-date">
                      <CalendarDays size={15} />
                      <span>
                        {formatDate(exam.examDate)}
                      </span>
                    </div>
                  </div>

                  <div className="exam-status">
                    {isCompleted ? (
                      <span className="completed">
                        Completed
                      </span>
                    ) : (
                      <>
                        <span className="upcoming">
                          Upcoming
                        </span>

                        <div className="days-left">
                          <Clock size={14} />

                          {daysRemaining === 0
                            ? "Today"
                            : `${daysRemaining} days left`}
                        </div>
                      </>
                    )}
                  </div>

                </div>
              );
            })}

          </div>
        )}

      </div>

    </div>
  );
}

export default Exams;