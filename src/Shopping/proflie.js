import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { findUserProfileById, findItemsBySeller } from './users/client'; // Import the function from client.js
import './index.css';

function ProfilePage({ isAuthenticated }) {
    const [user, setUser] = useState(null);
    const [items, setItems] = useState([]);
    const { profileId } = useParams();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await findUserProfileById(profileId);
                setUser(userData);
                if (userData.role === 'SELLER') {
                  const sellerItems = await findItemsBySeller(profileId);
                  setItems(sellerItems);
                  // console.log(sellerItems);
              }
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUser();
    }, [profileId]);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>User Profile</h1>
            <p>Username: {user.username}</p>
            <p>Role: {user.role}</p>
            {isAuthenticated && user.role === 'SELLER' && (
                <p>Email: {user.email}</p>
            )}
            {user.role === 'SELLER' && (
                <div>
                    <h2>Posted Items</h2>
                    <ul>
                        {items.map(item => (
                            <li key={item._id}>
                                <Link to={`/shopping/item/${item._id}`}>{item.name}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default ProfilePage;
