
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaUserCircle,
  FaTachometerAlt,
  FaBook,
  FaClipboardList,
  FaBriefcase
} from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const [showProfile, setShowProfile] = useState(false);
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <nav className="navbar">

      <div className="logo">
        🎓 Smart Learning
      </div>

      <div className="nav-links">

        <Link to="/dashboard">
          <FaTachometerAlt /> Dashboard
        </Link>

        <Link to="/courses">
          <FaBook /> Courses
        </Link>

        <Link to="/assignments">
          <FaClipboardList /> Assignments
        </Link>

        <Link to="/jobs">
          <FaBriefcase /> Placements
        </Link>

        <div className="profile-section">

          <FaUserCircle
            size={34}
            className="profile-icon"
            onClick={() => setShowProfile(!showProfile)}
          />

          {showProfile && (
            <div className="profile-dropdown">

              <div className="user-details">

                <div className="user-avatar">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>

                <h4>{user?.name}</h4>

                <p>{user?.email}</p>

                <p className="user-role">
                  {user?.role}
                </p>
                {user?.role === "admin" && (
                  <span className="role-pill admin-pill">Admin Access</span>
                )}

              </div>

              <button onClick={handleLogout}>
                Logout
              </button>

            </div>
          )}

        </div>

      </div>
    </nav>
  );
}

export default Navbar;
