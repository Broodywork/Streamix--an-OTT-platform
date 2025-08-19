import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Navbar from "./navbar";
import axios from "axios";

function Change() {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { logout } = useContext(AuthContext);

  const handlePasswordChange = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await axios.put(
        "http://127.0.0.1:8000/api/change_pw",
        {
          old_password: currentPassword,
          new_password: newPassword,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      alert(response.data.message || "Password updated successfully!");
      logout(); // log user out after changing password
      navigate("/login"); // redirect to login page
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.error || "Something went wrong. Please try again."
      );
    }
  };

  const handlelogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <Navbar handlelogout={handlelogout} />

      <div className="hero" style={{ backgroundColor: "black" }}>
        <div className="mona">
          <div className="naan" style={{ backgroundColor: "white", color: "black" }}>
            <h2>Change Password</h2>

            <input
              type="password"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
            />

            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
            />

            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
            />

            <button
              onClick={handlePasswordChange}
              style={{
                width: "100%",
                padding: "10px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Change Password
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Change;
