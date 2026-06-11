import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const login = auth?.login || (() => {});

  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "student",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", form);

      login(res.data);

      toast.success("Login Successful!");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login Failed"
      );
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
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
            className="role-select"
          >
            <option value="student">Student</option>
            <option value="trainer">Trainer</option>
            <option value="admin">Admin</option>
          </select>

          <button type="submit">
            Login
          </button>
        </form>

        <p className="auth-link">
          New User?{" "}
          <Link to="/register">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;