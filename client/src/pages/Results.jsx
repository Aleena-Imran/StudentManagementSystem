import { useEffect, useState } from "react";
import axios from "axios";
import { BookOpen, Award, TrendingUp } from "lucide-react";
import "./Results.css";

function Results() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "http://localhost:5000/api/results",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setResults(response.data.results || []);
      } catch (err) {
        console.error(err);
        setError("Unable to load results");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  const getPercentage = (marks, maxMarks) => {
    if (!maxMarks) return 0;
    return ((marks / maxMarks) * 100).toFixed(1);
  };

  const averagePercentage =
    results.length > 0
      ? (
          results.reduce(
            (total, result) =>
              total +
              Number(getPercentage(result.marksObtained, result.maxMarks)),
            0
          ) / results.length
        ).toFixed(1)
      : 0;

  if (loading) {
    return <div className="results-page">Loading results...</div>;
  }

  if (error) {
    return <div className="results-page">{error}</div>;
  }

  return (
    <div className="results-page">
      <div className="results-header">
        <div>
          <h1>My Results</h1>
          <p>View your academic performance and examination results.</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="result-summary">
        <div className="result-card">
          <div className="result-icon">
            <BookOpen size={22} />
          </div>

          <div>
            <span>Total Subjects</span>
            <h2>{results.length}</h2>
          </div>
        </div>

        <div className="result-card">
          <div className="result-icon">
            <TrendingUp size={22} />
          </div>

          <div>
            <span>Average Percentage</span>
            <h2>{averagePercentage}%</h2>
          </div>
        </div>

        <div className="result-card">
          <div className="result-icon">
            <Award size={22} />
          </div>

          <div>
            <span>Latest Result</span>
            <h2>{results.length > 0 ? results[0].grade : "-"}</h2>
          </div>
        </div>
      </div>

      {/* Results Table */}
      <div className="results-table-card">
        <div className="table-heading">
          <h2>Academic Results</h2>
          <p>Your examination performance</p>
        </div>

        {results.length === 0 ? (
          <div className="no-results">
            <p>No results available yet.</p>
          </div>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Assessment</th>
                  <th>Marks</th>
                  <th>Percentage</th>
                  <th>Grade</th>
                  <th>Semester</th>
                </tr>
              </thead>

              <tbody>
                {results.map((result) => (
                  <tr key={result._id}>
                    <td>{result.subject}</td>
                    <td>{result.assessment}</td>

                    <td>
                      {result.marksObtained} / {result.maxMarks}
                    </td>

                    <td>
                      {getPercentage(
                        result.marksObtained,
                        result.maxMarks
                      )}
                      %
                    </td>

                    <td>
                      <span className="grade-badge">
                        {result.grade}
                      </span>
                    </td>

                    <td>{result.semester}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Results;