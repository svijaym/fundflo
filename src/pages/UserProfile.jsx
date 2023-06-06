import { Button } from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const UserProfile = () => {
  const [data, setData] = useState({});
  console.log(data);
  const navigate = useNavigate();
  function handleLogout() {
    fetch("https://fdbackend2.onrender.com/users/logout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    // Remove JWT token from local storage
    localStorage.removeItem("token");
    alert("Loggged out succesfully redirecting to home page");
    navigate("/");
  }
  console.log(data);
  console.log(data);
  console.log(data);
  return (
    <div>
      <div>UserProfile</div>

      <div>Hello user</div>

      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default UserProfile;
