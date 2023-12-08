import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as client from "./client";

function useAuth() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await client.account(); // Replace with your authentication check
        if (!user) {
          navigate('/Shopping/signin');
        }
      } catch (error) {
        console.error('Not authenticated:', error);
        navigate('/Shopping/signin');
      }
    };

    checkAuth();
  }, [navigate]);
}

export default useAuth;
