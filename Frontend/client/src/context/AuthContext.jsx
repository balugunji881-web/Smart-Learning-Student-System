import { createContext, useState } from "react";

export const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
});

const getStoredUser = () => {
  try {
    const savedUser = localStorage.getItem("user");

    if (!savedUser || savedUser === "undefined" || savedUser === "null") {
      localStorage.removeItem("user");
      return null;
    }

    return JSON.parse(savedUser);
  } catch {
    localStorage.removeItem("user");
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getStoredUser);

  const login = (data) => {
    const loggedInUser = data?.user || null;
    const token = data?.token || "";

    if (loggedInUser) {
      localStorage.setItem("user", JSON.stringify(loggedInUser));
    } else {
      localStorage.removeItem("user");
    }

    localStorage.setItem("token", token);
    setUser(loggedInUser);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};