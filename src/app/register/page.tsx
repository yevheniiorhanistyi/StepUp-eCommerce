'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import RegisterForm from '@/components/Register/Form/RegisterForm';
import { useAuth } from '@/context/AuthContext';

const Register = (): JSX.Element | null => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/');
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated) return null;

  return (
    <div className="flex items-center justify-center p-4 sm:p-8 w-full">
      <RegisterForm />
    </div>
  );
};

export default Register;
