import * as client from "./client";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./account.css";
// import { useDispatch } from "react-redux";
import useAuth from './useAuth'; // Import the custom hook
import { fetchLikedItemsByUserId} from "./client";

// function extractRealSlug(url) {
//   const slugIndex = url.indexOf('slug=');
//   if (slugIndex === -1) {
//       return '';
//   }
//   return url.substring(slugIndex + 5);
// }

function Account({ setIsAuthenticated }) {
  const [account, setAccount] = useState(null);
  const navigate = useNavigate();
  const [likedItemIds, setLikedItemIds] = useState([]);
  // const userId = getCurrentUserId

  useAuth(); // This will handle the authentication check and redirect
  // const dispatch = useDispatch();
  const fetchUser = async () => {
    try {
      const user = await client.account();
      if (user) {
        setAccount(user);
        loadLikedItemIds(user._id); // Load liked items for this user
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      navigate("/Shopping/signin");
    }
  };

  const loadLikedItemIds = async (userId) => {
    try {
        const itemIds = await fetchLikedItemsByUserId(userId);
        setLikedItemIds(itemIds);
    } catch (error) {
        console.error('Error fetching liked item IDs:', error);
    }
};


  const save = async () => {
    await client.updateUser(account);
  };
  const signout = async () => {
    const status = await client.signout();
    setIsAuthenticated(false);
    navigate("/Shopping/signin");
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="account-container">
      <h1>Account</h1>
      {account && (
        <div lassName="account-form">
          {/* <p>Username: {account.username}</p> */}
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={account.username}
            onChange={(e) => setAccount({ ...account, username: e.target.value })}
          />
          <br/>

          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            type="text"
            value={account.firstName}
            onChange={(e) =>
              setAccount({ ...account, firstName: e.target.value })
            }
          />
          <br/>

          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            type="text"
            value={account.lastName}
            onChange={(e) => setAccount({ ...account, lastName: e.target.value })}
          />
          <br/>

          <label htmlFor="dob">Date of Birth</label>
          <input
            id="dob"
            type="date"
            value={account.dob}
            onChange={(e) => setAccount({ ...account, dob: e.target.value })}
          />
          <br/>

          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={account.email}
            onChange={(e) => setAccount({ ...account, email: e.target.value })}
          />
          <br/>

          <label htmlFor="role">Role</label>
          <select
            id="role"
            value={account.role}
            onChange={(e) => setAccount({ ...account, role: e.target.value })}
          >
            <option value="BUYER">Buyer</option>
            <option value="ADMIN">Admin</option>
            <option value="SELLER">Seller</option>
          </select>
          <br/>
          <button onClick={save} className="save-button w-100">
            Save
          </button>
          <br/>
          <button onClick={signout} className="signout-button w-100">
            Sign Out
          </button>

          {account.role === "ADMIN" && (
            <Link to="/Shopping/users/table" className="btn btn-warning w-100">
              Users
            </Link>
          )}
          {/* Liked Items Section */}
          <h2>My Liked Items</h2>
          <ul>
              {likedItemIds.map(itemId => (
                <li key={itemId}>
                    <Link to={`/shopping/details/Toko/${encodeURIComponent(itemId)}`}>Item ID: {itemId}</Link>
                </li>
              ))}
          </ul>
{/* <pre>{JSON.stringify(likedItemIds)}</pre> */}

        </div>
      )}
    </div>
  );
}

export default Account;