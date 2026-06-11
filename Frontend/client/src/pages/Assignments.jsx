import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import { FaClipboardList } from "react-icons/fa";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

function Assignments() {
  const { user } = useContext(AuthContext);
  const role = user?.role || "student";
  const canManage = role === "admin" || role === "trainer";

  const roleBasedAssignments = {
    admin: [
      { title: "Admin Review Queue", due: "12 June 2026", status: "Priority" },
      { title: "Placement Approval Checklist", due: "18 June 2026", status: "Pending" },
      { title: "Course Quality Report", due: "24 June 2026", status: "Submitted" }
    ],
    trainer: [
      { title: "Trainer Feedback Round", due: "13 June 2026", status: "Pending" },
      { title: "Mentor Session Notes", due: "19 June 2026", status: "Reviewed" },
      { title: "Lab Evaluation Sheet", due: "26 June 2026", status: "Pending" }
    ],
    student: [
      { title: "React Authentication", due: "15 June 2026", status: "Pending" },
      { title: "Node REST API", due: "20 June 2026", status: "Submitted" },
      { title: "MongoDB CRUD", due: "25 June 2026", status: "Pending" }
    ]
  };

  const assignments = roleBasedAssignments[role] || roleBasedAssignments.student;

  const handleViewAssignment = (assignment) => {
    if (assignment.status === "Submitted") {
      toast.info(`${assignment.title} is already submitted`);
    } else {
      toast.success(`Opening ${assignment.title}`);
    }
  };

  const handleEvaluateAssignment = (assignment) => {
    toast.info(`Evaluating ${assignment.title} as ${role}.`);
  };

  const handleCreateAssignment = () => {
    toast.success("Open assignment creation flow for admins and trainers.");
  };

  return (
    <>
      <Navbar />

      <div className="page-container">

        <div className="hero-section">
          <div className="hero-overlay">
            <h1>Assignments</h1>
            <p>Submit and Track Assignments</p>
            {canManage && (
              <button className="secondary-btn" onClick={handleCreateAssignment}>
                Add Assignment
              </button>
            )}
          </div>
        </div>

        <div className="card-grid">
          {assignments.map((item, index) => (
            <div className="glass-card" key={index}>
              <div className="card-icon">
                <FaClipboardList />
              </div>

              <h3>{item.title}</h3>
              <p>Due Date: {item.due}</p>
              <p>Status: {item.status}</p>

              <button
                className="primary-btn"
                onClick={() =>
                  canManage
                    ? handleEvaluateAssignment(item)
                    : handleViewAssignment(item)
                }
              >
                {canManage ? "Evaluate Assignment" : "View Assignment"}
              </button>
            </div>
          ))}
        </div>

        {!canManage && (
          <div className="activity-card">
            <h2>Student Workflow</h2>
            <p>Students can view and submit assignments. Trainers and admins can add and evaluate assignments.</p>
          </div>
        )}

      </div>
    </>
  );
}

export default Assignments;