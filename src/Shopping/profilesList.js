import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { findAllUserProfiles } from './users/client'; // Import the function from client.js

function ProfilesList() {
    const [profiles, setProfiles] = useState([]);
    const [groupedProfiles, setGroupedProfiles] = useState({});

    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                const profilesData = await findAllUserProfiles();
                setProfiles(profilesData);
                groupProfilesByRole(profilesData);
            } catch (error) {
                console.error('Error fetching profiles:', error);
            }
        };

        fetchProfiles();
    }, []);

    const groupProfilesByRole = (profiles) => {
        const grouped = profiles.reduce((acc, profile) => {
            acc[profile.role] = acc[profile.role] || [];
            acc[profile.role].push(profile);
            return acc;
        }, {});
        setGroupedProfiles(grouped);
    };


    return (
        <div>
            <h1>User Profiles</h1>
            <Link to="../profile" className="btn btn-primary">
                Go to My Account
            </Link>
            {Object.entries(groupedProfiles).map(([role, profilesInRole]) => (
                <div key={role}>
                    <h2>{role}</h2>
                    <ul>
                        {profilesInRole.map(profile => (
                            <li key={profile.id}>
                                <Link to={`${profile.id}`}>{profile.username}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

export default ProfilesList;
