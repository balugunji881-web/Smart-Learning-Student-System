import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import { FaBriefcase } from "react-icons/fa";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

function Jobs() {
  const { user } = useContext(AuthContext);
  const role = user?.role || "student";
  const canManage = role === "admin" || role === "trainer";

  const roleBasedJobs = {
    admin: [
      { company: "Academy Admin Desk", role: "Placement Coordinator", location: "Internal Panel" },
      { company: "Hiring Board", role: "Employer Approval", location: "Operations" },
      { company: "Talent Office", role: "Student Placement Review", location: "HQ" }
    ],
    trainer: [
      { company: "SkillForge", role: "Trainer Referral", location: "Remote" },
      { company: "CodeMentor", role: "Mentorship Placement", location: "Hybrid" },
      { company: "CampusLink", role: "Student Support Job", location: "On-site" }
    ],
    student: [
      { company: "TCS", role: "React Developer", location: "Hyderabad" },
      { company: "Infosys", role: "MERN Developer", location: "Bangalore" },
      { company: "Wipro", role: "Frontend Developer", location: "Chennai" }
    ]
  };

  const jobs = roleBasedJobs[role] || roleBasedJobs.student;

  const handleApply = (job) => {
    toast.success(`Application submitted for ${job.role} at ${job.company}`);
  };

  const handleAddPlacement = () => {
    toast.success("Open placement creation flow for admins and trainers.");
  };

  const handleViewApplicants = (job) => {
    toast.info(`Viewing applicants for ${job.role} at ${job.company}`);
  };

  return (
    <>
      <Navbar />

      <div className="page-container">

        <div className="hero-section">
          <div className="hero-overlay">
            <h1>Placement Opportunities</h1>
            <p>{canManage ? "Add and manage placement posts." : "Apply for available jobs."}</p>
            {canManage && (
              <button className="secondary-btn" onClick={handleAddPlacement}>
                Add Placement
              </button>
            )}
          </div>
        </div>

        <div className="card-grid">
          {jobs.map((job, index) => (
            <div className="glass-card" key={index}>
              <div className="card-icon">
                <FaBriefcase />
              </div>

              <h3>{job.company}</h3>
              <p>{job.role}</p>
              <p>{job.location}</p>

              <button
                className="primary-btn"
                onClick={() =>
                  canManage ? handleViewApplicants(job) : handleApply(job)
                }
              >
                {canManage ? "Manage Applicants" : "Apply Now"}
              </button>
            </div>
          ))}
        </div>

        {!canManage && (
          <div className="activity-card">
            <h2>Student Placement Access</h2>
            <p>Students can view jobs and apply. Trainers and admins can add placements and manage applicants.</p>
          </div>
        )}

      </div>
    </>
  );
}

export default Jobs;