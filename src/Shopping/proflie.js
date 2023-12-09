import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { findUserProfileById } from './users/client'; // Import the function from client.js

function ProfilePage() {
    const [user, setUser] = useState(null);
    const { profileId } = useParams();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await findUserProfileById(profileId);
                setUser(userData);
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
        </div>
    );
}

export default ProfilePage;
