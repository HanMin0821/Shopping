import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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
    <div class="tab-content mt-5">
      <div class="tab-pane fade show active" id="pills-register" role="tabpanel" aria-labelledby="tab-register">
        <form onSubmit={signup}>
          {error && <div className="error">{error}</div>}
          <h3>Sign Up</h3>

          <div class="form-outline mb-4">
            <input 
              type="text"
              id="registerUsername"
              class="form-control"
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
            />
            <label class="form-label" for="registerUsername">Username</label>
          </div>

          <div class="form-outline mb-4">
            <input 
              type="password"
              id="registerPassword"
              class="form-control"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            />
            <label class="form-label" for="registerPassword">Password</label>
          </div>

          <div class="mb-4">
          <label class="form-label" for="registerRole">Role</label>
            <select
              id="registerRole"
              // class="form-control"
              value={credentials.role}
              onChange={(e) => setCredentials({ ...credentials, role: e.target.value })}
            >
              <option value="BUYER">Buyer</option>
              <option value="SELLER">Seller</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>

          <button type="submit" class="btn btn-primary btn-block mb-4">Sign Up</button>

          <div>
            <p>Already a member?<Link to="/shopping/signin">SignIn</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;