import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const PrivateRoute = ({ children }) => {
  const [myToken, setMyToken] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token") || null;
    if (token) {
      setMyToken(token);
    }
  }, []);
  if (!myToken) {
    alert("please signin first");
    navigate("/");
  }
  return children;
};

export default PrivateRoute;
