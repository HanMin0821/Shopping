import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as client from "./client";
import "./sign.css";

function Signup() {
  const [error, setError] = useState("");
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const signup = async () => {
    // event.preventDefault();
    try {
      await client.signup(credentials);
      navigate("/Shopping/profile");
    } catch (err) {
      setError(err.response.data.message || "An error occurred");
    }
  };

  return (
    <div className="signup-container">
      <h1>Sign Up</h1>
      {error && <div className="error">{error}</div>}
      <input
        type="text"
        placeholder="Username"
        value={credentials.username}
        onChange={(e) =>
          setCredentials({
            ...credentials,
            username: e.target.value,
          })
        }
      />
      <input
        type="password"
        placeholder="Password"
        value={credentials.password}
        onChange={(e) =>
          setCredentials({
            ...credentials,
            password: e.target.value,
          })
        }
      />
      <label>
          Role:
          <select
            value={credentials.role}
            onChange={(e) =>
              setCredentials({ ...credentials, role: e.target.value })
            }
          >
            <option value="BUYER">Buyer</option>
            <option value="SELLER">Seller</option>
            <option value="ADMIN">Admin</option>
          </select>
        </label>

      <button onClick={signup}>Sign Up</button>
    </div>
  );
}

export default Signup;