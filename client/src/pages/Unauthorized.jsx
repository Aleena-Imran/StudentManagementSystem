import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div style={{ textAlign: "center", padding: "100px" }}>
      <h1>403</h1>

      <h2>Access Denied</h2>

      <p>
        You do not have permission to access this page.
      </p>

      <Link to="/dashboard">
        Go to Dashboard
      </Link>
    </div>
  );
};

export default Unauthorized;