import { useState, useEffect } from 'react';

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  admin: boolean;
  theme: string;
  position: string;
  dismissed_welcome_screen: boolean;
  phone_number: string;
  first_time_login: boolean;
}

export function useIdentity() {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    getCurrentUser();
  }, []);
  const getCurrentUser = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/v2/users/1', {
        method: 'GET',
        credentials: 'include',
      });
      const currentUser = await response.json();
      setUser(currentUser);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    user,
  };
}
