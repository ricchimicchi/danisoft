'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  userId: string;
  passwordForUser?: string;
  role: 'user' | 'admin';
}

const ProfilePage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/user`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setUser(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };

    fetchUserData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  const handleSignOut = async () => {
    try {
      await fetch(`${BASE_URL}/api/signout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      router.push('/profile');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>User Profile</h1>
      {user ? (
        <div>
          <p><strong>ID:</strong> {user.id}</p>
          <p><strong>User ID:</strong> {user.userId}</p>
          <p><strong>Main Password:</strong> {user.passwordForUser}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      ) : (
        <p>No user data available</p>
      )}
    </div>
  );
};

export default ProfilePage;
