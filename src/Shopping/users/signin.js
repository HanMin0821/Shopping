import * as client from "./client";
import {useState, useEffect} from "react";
import {useNavigate, Link} from "react-router-dom";
import './sign.css'

function Signin({setIsAuthenticated}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const signIn = async () => {
    try {
      const credentials = {username, password};
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
      <div class="tab-content mt-5">
        <div class="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="tab-login">
          {error && <div className="error">{error}</div>}
          <h3>Sign In</h3>
          <div class="form-outline mb-4">
            <input
                type="text"
                id="loginName"
                class="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <label class="form-label" for="loginName">Username</label>
          </div>

          <div class="form-outline mb-4">
            <input
                type="password"
                id="loginPassword"
                class="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <label class="form-label" for="loginPassword">Password</label>
          </div>

          <button type="submit" onClick={signIn} class="btn btn-primary btn-block mb-4">Sign in</button>

          <div>
            <p>Not a member?<Link to="/shopping/signup">Signup</Link></p>
          </div>
        </div>
      </div>
  );
}

export default Signin;
