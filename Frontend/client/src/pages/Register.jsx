import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/register", form);

      toast.success("Registration Successful!");

      setTimeout(() => {
        navigate("/");
      }, 1000);

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Registration Failed"
      );
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">

        <h2>Create Account</h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Enter Name"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
            required
          />

          <input
            type="email"
            placeholder="Enter Email"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
            required
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={form.password}
            onChange={(e) =>
              setForm({
                ...form,
                password: e.target.value,
              })
            }
            required
          />

          <select
            value={form.role}
            onChange={(e) =>
              setForm({
                ...form,
                role: e.target.value,
              })
            }
          >
            <option value="student">Student</option>
            <option value="trainer">Trainer</option>
            <option value="admin">Admin</option>
          </select>

          <button type="submit">
            Register
          </button>

        </form>

        <p className="auth-link">
          Already have an account?
          <Link to="/"> Login</Link>
        </p>

      </div>
    </div>
  );
}

export default Register;