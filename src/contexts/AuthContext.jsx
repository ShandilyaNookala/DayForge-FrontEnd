import { createContext, useContext, useEffect, useState } from "react";
import { sendAPI } from "../utils/helpers";
import { baseUrl } from "../utils/config";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [checkedAuth, setCheckedAuth] = useState(false);

  useEffect(function () {
    async function fetchUser() {
      try {
        const user = await sendAPI("POST", `${baseUrl}/auth/is-logged-in`);
        if (user.status === "fail") setUser(null);
        else if (user.status === "success") setUser(user.data);
      } catch (err) {
        setUser(null);
      } finally {
        setCheckedAuth(true);
      }
    }
    fetchUser();
  }, []);

  async function login(userName, password) {
    const data = await sendAPI("POST", `${baseUrl}/auth/login`, {
      userName,
      password,
    });
    if (data.status === "success") {
      setUser(data.data);
      return null;
    }
    return data.message;
  }

  async function logout() {
    const data = await sendAPI("POST", `${baseUrl}/auth/logout`);
    if (data.status === "success") {
      setUser(null);
      return null;
    }
    return data.message;
  }

  return (
    <AuthContext.Provider value={{ user, checkedAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
