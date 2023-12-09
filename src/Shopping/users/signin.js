import * as client from "./client";
import { useState, useEffect} from "react";
import { useNavigate, Link } from "react-router-dom";
import './sign.css'
function Signin({ setIsAuthenticated }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  const signIn = async () => {
    try {
      const credentials = { username, password };
      const user = await client.signin(credentials);
      if (user) {
        setIsAuthenticated(true); // Set authenticated state to true
        // localStorage.setItem('userId', user.id);
        navigate("/Shopping/profile");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) { // Assuming 401 status for incorrect password
        setError("Invalid username or password");
      } else {
        setError(error.response?.data?.message || "An error occurred during sign in");
      }
    }
  };
  return (
    <div>
      <h2>Sign In</h2>
       {error && <div className="error">{error}</div>}
      <input
        type="text"
        className="form-control"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        className="form-control"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={signIn} className="btn btn-primary">
        Sign In
      </button>
    </div>
  );
}
export default Signin;