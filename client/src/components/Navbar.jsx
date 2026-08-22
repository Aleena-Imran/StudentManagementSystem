import {Link} from 'react-router-dom';

function Navbar(){
    return(
        <nav>
            <Link to="/">Home</Link> |{" "}
            <Link to="/dashboard">Dashboard</Link> |{" "}
            <Link to="/add">Add Student</Link> |{" "}
            <Link to="/students">Students</Link>
        </nav>
    );
}
export default Navbar;