'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Form, Formik, ErrorMessage } from 'formik';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { Eye, EyeOff } from 'lucide-react';

import LoginSchema from './LoginSchema';

const LoginForm = (): JSX.Element => {
  const [showPassword, setShowPassword] = useState(false);
  const { setAuthentication } = useAuth();
  const router = useRouter();

  return (
    <Formik
      initialValues={{
        email: '',
        password: ''
      }}
      validationSchema={LoginSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
          });

          const result = await response.json();

          if (!response.ok) throw new Error(result.error.message);

          setAuthentication(true);
          toast.success(`Logged in as ${values.email}`);
          router.push('/');
        } catch (error) {
          if (error instanceof Error) {
            toast.error(error.message || 'Login failed.');
          } else {
            toast.error('Unexpected error. Please try again.');
          }
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ values, errors, touched, handleChange, handleBlur }) => (
        <Form className="flex flex-col gap-2 w-full">
          {/* Email */}
          <div className="relative w-full">
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              autoComplete="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={cn(
                '!text-sm !placeholder:text-sm',
                errors.email && touched.email
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:border-black'
              )}
            />

            <div className="relative min-h-[1.25rem]">
              <ErrorMessage
                name="email"
                component="div"
                render={(msg) => <div className="absolute text-xs text-red-600 mt-1">{msg}</div>}
              />
            </div>
          </div>

          {/* Password */}
          <div className="relative w-full">
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>

            <Input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              autoComplete="current-password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={cn(
                '!text-sm !placeholder:text-sm',
                errors.password && touched.password
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:border-black',
                'pr-10'
              )}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="rounded-md bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 h-9 px-3 py-2 absolute bottom-5 right-0 hover:cursor-pointer"
              tabIndex={-1}
            >
              {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
            </button>

            <div className="relative min-h-[1.25rem]">
              <ErrorMessage
                name="password"
                component="div"
                render={(msg) => <div className="absolute text-xs text-red-600 mt-1">{msg}</div>}
              />
            </div>
          </div>

          <Button type="submit" className="w-full cursor-pointer">
            Login
          </Button>

          <div className="text-center mt-2 text-sm">
            <span>Don&apos;t have an account?</span>
            <a
              href="/register"
              className="underline underline-offset-4 text-black hover:text-neutral-600 transition-colors font-bold ml-1"
            >
              Create one
            </a>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
