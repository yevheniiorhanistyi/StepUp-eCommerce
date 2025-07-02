'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import LoginForm from './LoginForm';
import { useAuth } from '@/context/AuthContext';

const Login = (): JSX.Element | null => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/');
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated) return null;

  return (
    <div className="flex w-full items-center justify-center p-4 sm:p-8">
      <Card className="flex flex-col items-center justify-center p-5 sm:px-12 sm:py-8 w-full max-w-lg bg-white shadow-lg rounded-xl">
        <CardHeader className="gap-0 px-0 w-full">
          <CardTitle className="text-3xl font-bold text-center">Welcome to StepUp</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-5 px-0 w-full">
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
