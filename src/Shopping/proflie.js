// ProfilePage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // assuming you're using react-router for routing

function ProfilePage() {
  const [profileData, setProfileData] = useState(null);
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const { profileId } = useParams(); // This will grab the profileId from the URL

  useEffect(() => {
    const fetchProfileData = async () => {
      const endpoint = profileId ? `/api/profile/${profileId}` : '/api/profile';
      try {
        const response = await axios.get(endpoint);
        setProfileData(response.data);
        setIsOwnProfile(!profileId); // If no profileId, it's the logged-in user's profile
      } catch (error) {
        console.error('Error fetching profile data', error);
      }
    };

    fetchProfileData();
  }, [profileId]);

  if (!profileData) {
    return <div>Loading...</div>;
  }

  const { personalInfo, following, followers, favorites, reviews } = profileData;

  // Function to update user's personal information
  const updatePersonalInfo = (newInfo) => {
    // Send this to your backend to update the database
  };

  return (
    <div className="profile-container">
      <div className="personal-info">
        <h2>Personal Information</h2>
        {isOwnProfile ? (
          <>
            <div>Email: {personalInfo.email}</div>
            <div>Phone: {personalInfo.phone}</div>
            <button onClick={() => updatePersonalInfo()}>Edit Information</button>
          </>
        ) : (
          <div>{personalInfo.displayName}</div>
        )}
      </div>

      <div className="social-info">
        <div className="following">
          <h3>Following</h3>
          <ul>
            {following.map((user) => (
              <li key={user.id}><a href={`/profile/${user.id}`}>{user.displayName}</a></li>
            ))}
          </ul>
        </div>

        <div className="followers">
          <h3>Followers</h3>
          <ul>
            {followers.map((user) => (
              <li key={user.id}><a href={`/profile/${user.id}`}>{user.displayName}</a></li>
            ))}
          </ul>
        </div>
      </div>

      <div className="content-info">
        <div className="favorites">
          <h3>Favorites</h3>
          <ul>
            {favorites.map((favorite) => (
              <li key={favorite.id}><a href={favorite.link}>{favorite.title}</a></li>
            ))}
          </ul>
        </div>

        <div className="reviews">
          <h3>Reviews</h3>
          <ul>
            {reviews.map((review) => (
              <li key={review.id}>
                <p>{review.summary}</p>
                <a href={review.link}>Read More</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
