'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import UserDetails from '@/components/Profile/details';
import { useAuth } from '@/context/AuthContext';
import SpinnerFallback from '@/components/SpinnerFallback/SpinnerFallback';

const Profile = (): JSX.Element | null => {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/');
    }
  }, [isAuthenticated, router]);

  if (!user) {
    return <SpinnerFallback />;
  }

  if (!isAuthenticated) return null;

  return (
    <div className="flex flex-col items-center justify-center p-5 sm:p-10 w-full max-w-[1520px] mx-auto gap-15">
      <UserDetails />
    </div>
  );
};

export default Profile;
