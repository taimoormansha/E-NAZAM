import AuthContext from "./AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const host = "http://localhost:8001";
  const authToken = localStorage.getItem("authToken");

  //   Fetch User data by auth-token
  const getUser = async () => {
    try {
      const response = await axios.get(`${host}/auth/user`, {
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken,
        }
      });
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch All Users role: Super-Admin
  const getUsers = async () => {
    try {
      const response = await axios.get(`${host}/user/all`, {
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken,
        }
      });
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const setNewUser = (user) => {
    setUser(user);
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await getUser().then((res) => {
        setUser(res.data);
      });
    };

    fetchData();
  }, []);

  const contextValues = {
    user,
    setNewUser,
    getUsers,
  };

  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
