import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import {
  FaUserGraduate,
  FaBook,
  FaClipboardList,
  FaBriefcase,
  FaChartLine,
  FaUsers,
  FaChalkboardTeacher
} from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

function Dashboard() {
  const { user } = useContext(AuthContext);
  const role = user?.role || "student";
  const isAdmin = role === "admin";
  const isTrainer = role === "trainer";

  const handleAdminAction = (action) => {
    switch (action) {
      case "users":
        toast.info("Admin only: manage student and trainer accounts.");
        break;
      case "course":
        toast.info("Admin only: create or update courses for the academy.");
        break;
      case "job":
        toast.info("Admin only: post placement opportunities.");
        break;
      case "assignments":
        toast.info("Admin only: review assignment results and progress.");
        break;
      default:
        break;
    }
  };

  const heading = isAdmin
    ? "Admin Dashboard"
    : isTrainer
    ? "Trainer Dashboard"
    : "Student Dashboard";

  const subtitle = isAdmin
    ? "Manage students, courses, placements and platform settings."
    : isTrainer
    ? "Create assignments, support students and monitor course progress."
    : "Track your courses, assignments, and placement opportunities.";

  const stats = isAdmin
    ? [
        { icon: <FaUsers />, value: "120", label: "Registered Students" },
        { icon: <FaChalkboardTeacher />, value: "15", label: "Trainers" },
        { icon: <FaBook />, value: "25", label: "Courses Available" },
        { icon: <FaUserGraduate />, value: "98", label: "Course Enrollments" },
        { icon: <FaClipboardList />, value: "45", label: "Assignments Submitted" },
        { icon: <FaBriefcase />, value: "80", label: "Placed Students" }
      ]
    : isTrainer
    ? [
        { icon: <FaBook />, value: "12", label: "Active Courses" },
        { icon: <FaClipboardList />, value: "34", label: "Assignments Created" },
        { icon: <FaUserGraduate />, value: "98", label: "Enrolled Students" },
        { icon: <FaBriefcase />, value: "18", label: "Placement Referrals" }
      ]
    : [
        { icon: <FaBook />, value: "3", label: "Courses Enrolled" },
        { icon: <FaClipboardList />, value: "5", label: "Assignments Pending" },
        { icon: <FaUserGraduate />, value: "2", label: "Completed Courses" },
        { icon: <FaBriefcase />, value: "4", label: "Job Matches" }
      ];

  return (
    <>
      <Navbar />

      <div className="dashboard-container">
        <div className="activity-card" style={{ marginBottom: "16px" }}>
          <h2>Welcome, {user?.name || "Learner"}</h2>
          <p>
            Logged in as <strong>{role}</strong>. Your dashboard content is tailored for this role.
          </p>
        </div>
        <div className="hero-section">
          <div className="hero-overlay">
            <h1>{heading}</h1>
            <p>{subtitle}</p>
          </div>
        </div>

        <div className="stats-grid">
          {stats.map((item, index) => (
            <div className="glass-card" key={index}>
              {item.icon}
              <h2>{item.value}</h2>
              <p>{item.label}</p>
            </div>
          ))}
        </div>

        {isAdmin ? (
          <div className="dashboard-row">
            <div className="activity-card">
              <h2>Admin Quick Actions</h2>
              <div className="admin-action-list">
                <button onClick={() => handleAdminAction("users")}>Manage Users</button>
                <button onClick={() => handleAdminAction("course")}>Create Course</button>
                <button onClick={() => handleAdminAction("job")}>Post Job</button>
                <button onClick={() => handleAdminAction("assignments")}>Review Assignments</button>
              </div>
            </div>
            <div className="activity-card">
              <h2>Admin Access</h2>
              <ul>
                <li>Only admins can add job postings.</li>
                <li>Only admins can manage trainers and students.</li>
                <li>Only admins can publish platform-wide course updates.</li>
                <li>Only admins can review system analytics.</li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="dashboard-row">
            <div className="activity-card">
              <h2>What You Can Do</h2>
              <ul>
                <li>Enroll in courses and continue learning.</li>
                <li>Submit assignments and track progress.</li>
                <li>Apply for available placements.</li>
                <li>Ask your trainer for new course content.</li>
              </ul>
            </div>
            <div className="activity-card">
              <h2>Restricted Admin Features</h2>
              <ul>
                <li>Admin-only: create and manage job postings.</li>
                <li>Admin-only: publish new courses and platform updates.</li>
                <li>Admin-only: manage user accounts.</li>
                <li>Admin-only: view detailed system analytics.</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Dashboard;
