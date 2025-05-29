'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import UserDetails from '@/components/Profile/details';
import { useAuth } from '@/context/AuthContext';

const Profile = (): JSX.Element | null => {
  const router = useRouter();
  const { isAuthenticated, isAuthChecked } = useAuth();

  useEffect(() => {
    if (isAuthChecked && !isAuthenticated) {
      router.replace('/');
    }
  }, [isAuthenticated, isAuthChecked, router]);

  if (!isAuthChecked) return null;
  if (!isAuthenticated) return null;

  return (
    <div className="flex items-center justify-center p-5 sm:p-10 w-full max-w-[1520px] mx-auto">
      <UserDetails></UserDetails>
    </div>
  );
};

export default Profile;
