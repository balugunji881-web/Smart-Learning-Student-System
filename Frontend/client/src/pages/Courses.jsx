import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import { FaReact, FaJava, FaPython } from "react-icons/fa";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

function Courses() {
  const { user } = useContext(AuthContext);
  const role = user?.role || "student";
  const canManage = role === "admin" || role === "trainer";

  const roleBasedCourses = {
    admin: [
      {
        icon: <FaReact />,
        title: "Platform Governance",
        description: "Monitor academy-wide course quality and approvals.",
        progress: "92%"
      },
      {
        icon: <FaJava />,
        title: "Trainer Operations",
        description: "Review trainer schedules and course updates.",
        progress: "78%"
      },
      {
        icon: <FaPython />,
        title: "Student Analytics",
        description: "Track enrollments, completions, and placement outcomes.",
        progress: "88%"
      }
    ],
    trainer: [
      {
        icon: <FaReact />,
        title: "React Mentoring",
        description: "Guide students through advanced React workflows.",
        progress: "72%"
      },
      {
        icon: <FaJava />,
        title: "Java Lab Sessions",
        description: "Support practical Java backend training.",
        progress: "64%"
      },
      {
        icon: <FaPython />,
        title: "Python Coaching",
        description: "Review Python assignments and student progress.",
        progress: "81%"
      }
    ],
    student: [
      {
        icon: <FaReact />,
        title: "MERN Stack Development",
        description: "MongoDB, Express, React, Node.js",
        progress: "75%"
      },
      {
        icon: <FaJava />,
        title: "Java Full Stack",
        description: "Spring Boot + React",
        progress: "60%"
      },
      {
        icon: <FaPython />,
        title: "Python Full Stack",
        description: "Django + Data Science",
        progress: "85%"
      }
    ]
  };

  const courses = roleBasedCourses[role] || roleBasedCourses.student;

  const handleContinueLearning = (courseName) => {
    toast.success(`Continuing ${courseName}`);
  };

  const handleManageCourse = (courseName) => {
    toast.info(`Managing ${courseName} as ${role}.`);
  };

  const handleAddCourse = () => {
    toast.success("Open course creation flow for admins and trainers.");
  };

  return (
    <>
      <Navbar />

      <div className="page-container">

        <div className="hero-section">
          <div className="hero-overlay">
            <h1>Courses</h1>
            <p>Explore and Track Your Learning Journey</p>
            {canManage && (
              <button className="secondary-btn" onClick={handleAddCourse}>
                Add Course
              </button>
            )}
          </div>
        </div>

        <div className="card-grid">
          {courses.map((course, index) => (
            <div className="glass-card" key={index}>
              <div className="card-icon">
                {course.icon}
              </div>

              <h3>{course.title}</h3>
              <p>{course.description}</p>

              <div className="progress-container">
                <div
                  className="progress-bar"
                  style={{ width: course.progress }}
                ></div>
              </div>

              <span>{course.progress} Completed</span>

              <button
                className="primary-btn"
                onClick={() =>
                  canManage
                    ? handleManageCourse(course.title)
                    : handleContinueLearning(course.title)
                }
              >
                {canManage ? "Manage Course" : "Continue Learning"}
              </button>
            </div>
          ))}
        </div>

        {!canManage && (
          <div className="activity-card">
            <h2>Student Access</h2>
            <p>Students can continue courses here. Trainers and admins can add or manage courses.</p>
          </div>
        )}

      </div>
    </>
  );
}

export default Courses;